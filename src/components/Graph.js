import {ouuid, contains} from 'utils';
import Vertex from 'Vertex';
import Edge from 'Edge';

var Graph = function(graph_id)
{
	this.graph_id = graph_id || ouuid("graph");

	var self = this;

	this.mode = "build";
	this.new_vertex_color = "dark"; // "dark" or "light"
	this.jump_index=-1;
	this.pressing_sequence=[];

	this.setMode = function(mode)
	{
		self.mode = mode;
		if (self.mode === "build")
		{
			self.enableAddVertex();
		}
		else
		{
			self.disableAddVertex();
		}
		self.change_mode_button_text();
	}

	this.changeMode = function()
	{
		if (self.mode === "build")
		{
			self.mode = "play";
			self.disableAddVertex();
			self.clear_highlight();
			self.jump_index=self.undo_index;
			self.stash();
		}
		else
		{
			self.mode = "build";
			self.enableAddVertex();
			self.jump();
		}
		self.change_mode_button_text();
	}
	this.change_mode_button_text = function()
	{
		if (self.mode === "play")
		{
			d3.select("#mode_mg_text").text("PLAY");
		}
		else
		{
			d3.select("#mode_mg_text").text("BUILD");
		}
	}

	this.setColor = function(color)
	{
		self.new_vertex_color = color;
	}

	this.toggleColor = function()
	{
		self.change_color_button_text_color(self.new_vertex_color);
		if (self.highlighted === null)
		{
			if (self.new_vertex_color === "dark")
			{
				self.new_vertex_color = "light";
				self.change_color_button_text_color(self.new_vertex_color);
			}
			else
			{
				self.new_vertex_color = "dark";
				self.change_color_button_text_color(self.new_vertex_color);
			}
		}
		else
		{
			var v = self.graph.vertices[self.graph.highlighted];
			graph.highlighted = null;
			v.flip_and_swap_build();
		}
		self.stash();
	}

	this.change_color_button_text_color = function(color)
	{
		var textColor = d3.select("#color_text");
		if (color === "dark")
		{
			textColor.attr("fill", "#000000");
		}
		else
		{
			textColor.attr("fill", "#ffffff");
		}
	}

	this.svg_attrs = {
		// Using a 16:9 ratio for a canvas ensures the entire surface is visible on all mobile devices.
		"viewBox":"0 0 " + 1600 + " " + 900,
		"preserveAspectRatio":"xMinYMin meet",
	};

	this.graph_surface_attrs = {
		"id":"bknd",
		"x":130,
		"y":130,
		"width":1340,
		"height":640,
		"fill":"#000000"
	};

	this.vertices = {};
	this.edges = {};
	this.undo_array = [];
	this.undo_index = -1;
	this.bounding_box = [];

	this.highlighted = null;

	this.clear_highlight = function()
	{
		if (self.graph.highlighted != null)
		{
			self.change_color_button_text_color(self.new_vertex_color);
			self.graph.vertices[self.graph.highlighted].draw("initial");
			self.graph.highlighted = null;
		}
	}

	this.get_bounding_box = function()
	{
		this.bounding_box = [
			this.graph_surface_attrs.x,
			this.graph_surface_attrs.y,
			this.graph_surface_attrs.x + this.graph_surface_attrs.width,
			this.graph_surface_attrs.y + this.graph_surface_attrs.height,
		];
	}

	this.enableAddVertex = function()
	{

		d3.select("#bknd").on("click", function()
		{
			var coords = d3.mouse(this);
			if (self.highlighted !== null)
				self.graph.clear_highlight();
			else
				new Vertex(coords[0], coords[1], self, self.new_vertex_color);
			self.stash();
		});
	};

	this.disableAddVertex = function()
	{
		d3.select("#bknd").on("click", null);
	}

	this.modifyNeighborhood = function(clicked_vertex)
	{
		// We can't click a white vertex, but we CAN click a vertex with no edges.
		if (clicked_vertex.state === clicked_vertex.static_state)
		{
			return;
		}

		clicked_vertex.flip_state_play();
		var vn, v = [];
		clicked_vertex.edge_keys().forEach(function(key)
		{
			vn = clicked_vertex.edges[key].vertices_excluding(clicked_vertex.attrs.id);
			v.push(vn);
			vn.flip_state_play();
			clicked_vertex.edges[key].destroy();
		});
		var len = (v.length - 1),
			rest = [],
			vertices_needing_edges = [],
			edge_to_check, connected_vertex,
			e = [];
		for (var n = 0; n < len; n++)
		{
			rest = v.slice(n + 1, v.length); // slice is non-destructive; creates a copy, not a reference
			vertices_needing_edges = rest.slice(0, rest.length);
			v[n].edge_keys().forEach(function(key)
			{
				edge_to_check = v[n].edges[key];
				connected_vertex = edge_to_check.vertices_excluding(v[n].attrs.id);
				// for any given connected Vertex, if the Vertex is a member of the neighborhood in 'rest'...
				if (contains(rest, connected_vertex))
				{
					// then destroy this Edge and all references to it
					edge_to_check.destroy();
					// and remove the vertex from vertices_needing_edges
					vertices_needing_edges.splice(vertices_needing_edges.indexOf(connected_vertex), 1); // splice is destructive
				}
			});
			// Initialize new Edges to be created at end of loop over v[n].edge_keys().
			vertices_needing_edges.forEach(function (cv)
			{
				e.push(new Edge(v[n], cv, self));
			});
		}
		// Create new edges between v[n] and the remaining vertices in rest.
		e.forEach(function (ne)
		{
			ne.create(true);
		});
	};

	this.clear = function()
	{
		for(var vertex in self.vertices) self.vertices[vertex].destroy();
		for(var edge in self.edges) self.edges[edge].destroy();
		self.highlighted = null;
		self.undo_array = [];
		self.undo_index = -1;
		self.pressing_sequence=[];
		/*
			undo and redo reassign values for the following on import; we need to return to "build" defaults if we press the
			clear button.
		*/
		self.setMode("build");
		self.setColor("dark");
		self.change_color_button_text_color("dark");
		d3.select("#mode_mg_text").text("BUILD");
	};

	this.stash = function()
	{
		var snap = JSON.parse(self.export());
		if(typeof snap !== "undefined" && snap !== null) {
			//When a new action occurs, removes ALL future indexs from array
			self.undo_array.splice(self.undo_index+1);
			self.undo_index++;
			self.undo_array.push(snap);
		}
	};

	this.undo = function()
	{
		if (self.undo_index !=-1)
			self.change_array(-1);
	};

	this.redo = function()
	{
		if (self.undo_index != self.undo_array.length-1)
			self.change_array(1);
	};

	this.change_array = function(indexchange)
	{
		self.undo_index+=indexchange;
		var array = self.undo_array;
		var index = self.undo_index;
		self.import(array[index])
		self.undo_array=array;
		self.undo_index=index;
	}

	this.jump = function()
	{
		self.change_array(self.jump_index - self.undo_index);
	}

	this.export = function()
	{
		var data = {
			"graph_id": self.graph_id,
			"graph": [],
			"graph_mode": self.mode,
			"vertex_initial_color": self.new_vertex_color,
			"color_button_text_color": self.new_vertex_color,
			"pressing_sequence": self.pressing_sequence,
		};
		for (var v in self.vertices)
		{
			var node = self.vertices[v],
				coll = {
					"vertex_num": node.attrs.vertex_num,
					"x": node.attrs.cx,
					"y": node.attrs.cy,
					"state": node.state,
					"static_state": node.static_state,
					"initial_color": node.initial_color,
					"sequence": [],
					"knows": []
				}
			for (var e in node.edges)
			{
				var target = node.edges[e].vertices_excluding(v).attrs.vertex_num;
				if (target > self.vertices[v].attrs.vertex_num)
				{
					coll["knows"].push(target);
				}
			}
			/*
				We must order the vertices, which come form a potentially unordered collection, so they can be easily accessed
				later in this.import().
			*/
			data.graph[node.attrs.vertex_num - 1] = coll;
		}
		return JSON.stringify(data);
	};

	// Temporary function for testing backend.
	this.store = function() {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', "http://localhost:3000/", true);
		xhr.setRequestHeader("Content-type", "application/json");
		//console.log(self.export());
		xhr.send(self.export());
	}

	this.adjacency_matrix = function(data)
	{
		var vertex_hash = JSON.parse(self.export());
		var matrix = [];
		//Loop through the matrix's column
		for (var vertex in vertex_hash.graph)
		{
			var second_dimension_array = [];
			matrix.push(second_dimension_array);
		};

		vertex_hash.graph.forEach(function(vertex_obj)
		{
			//Loop through the matrix's row
			//i.knows.forEach(function(j)
			for (var count = vertex_obj.vertex_num - 1; count < vertex_hash.graph.length; count++)
			{
				if (vertex_obj.vertex_num - 1 === count)
				{
					if (vertex_obj.state === vertex_obj.static_state)
					{
						matrix[vertex_obj.vertex_num - 1].push("0");
					}
					else
					{
						matrix[vertex_obj.vertex_num - 1].push("1");
					}
				}
				else if (contains(vertex_obj.knows, count + 1))
				{
					matrix[vertex_obj.vertex_num - 1].push("1");
					matrix[count].push("1");
				}
				else
				{
					matrix[vertex_obj.vertex_num - 1].push("0");
					matrix[count].push("0");
				}
			};
		});
		// temporary
		console.log(matrix);
	};

	this.assign_info = function(objA, objB)
	{
		var v = new Vertex(objA.x, objA.y, self, objA.initial_color);
		v.attrs.vertex_num = objA.vertex_num;
		objB[v.attrs.vertex_num] = v;
		v.drawNum();
		v.draw(objA.state);
		// We need to be able act on highlights after stepping back or forward, and clear() in the calling function,
		// this.import(), nulls the highlighted flag.
		if (v.state === "highlighted") (self.highlighted = v.attrs.id);
		return v;
	};

	this.import = function(data)
	{
		self.clear();
		if (!data) return;
		self.id = data["graph_id"];
		self.setMode(data["graph_mode"]);
		self.new_vertex_color = data["vertex_initial_color"];
		self.change_color_button_text_color(data["color_button_text_color"]);
		self.pressing_sequence = data["pressing_sequence"];
		var temporary_collection = {};
		data.graph.forEach(function(vertex)
		{
			var origin = temporary_collection[vertex.vertex_num] || self.assign_info(vertex, temporary_collection);
			vertex.knows.forEach(function(v)
			{
				/*
					Accessing the target via v - 1 assumes that the vertices are in data.graph are ordered by vertex_num.
					To make sure this is the case, in this.export() we explicitly place each vertex in an an index on data.graph
					corresponging to vertex_num - 1. We must do this instead of pushing onto the array, since the collection we draw
					from is not guaranteed to be ordered.
				*/
				var target = temporary_collection[v] || self.assign_info(data.graph[v - 1], temporary_collection);
				var edge = new Edge(origin, target, self);
				edge.create(true);
			})
		});
	};

	// buttons
	this.buttonAttrs = [
		{"id":"store", "x":0, "y":0, "width":533, "height":90, "fill":"#BBBBBB", onClick: self.store},
		{"id":"recall", "x":533, "y":0, "width":534, "height":90, "fill":"#AAAAAA", onClick: function() {}},
		{"id":"playback", "x":1067, "y":0, "width":533, "height":90, "fill":"#999999", onClick: function() {}},
		{"id":"mode_mg", "x":0, "y":810, "width":533, "height":90, "fill":"#888888", onClick: self.changeMode},
		{"id":"color", "x":533, "y":810, "width":534, "height":90, "fill":"#888888", onClick: self.toggleColor},
		{"id":"reset", "x":1067, "y":810, "width":533, "height":90, "fill":"#777777", onClick: self.clear},
		{"id":"back", "x":0, "y":90, "width":90, "height":720, "fill":"#666666", onClick: self.undo},
		{"id":"forward", "x":1510, "y":90, "width":90, "height":720, "fill":"#666666", onClick: self.redo}
	];

	// button text - TEMPORARY
	/*
		TODO:
		1. Merge buttons and their texts in <g> elements so we have just one event handler per group.
		2. Turn texts into path elements centered at the origin and translated to their locations.
		3. Make effects for hover on buttons, change of text or appearance on toggle, and show disabling.
	*/
	this.buttonTexts = [
		{"id":"store_text", "x":220, "y":56, "fill":"#000000", text:"STORE", onClick: self.store},
		{"id":"recall_text", "x":740, "y":56, "fill":"#000000", text:"RECALL", onClick: function() {}},
		{"id":"playback_text", "x":1240, "y":56, "fill":"#000000", text:"PLAYBACK", onClick: function() {}},
		{"id":"mode_mg_text", "x":220, "y":866, "fill":"#000000",text:"BUILD", onClick: self.changeMode},
		{"id":"color_text", "x":740, "y":866, "fill":"rgba(0,128,0, 0.0);", text:"COLOR", onClick: self.toggleColor},
		{"id":"reset_text", "x":1280, "y":866, "fill":"#000000", text:"RESET", onClick: self.clear},
		{"id":"back_text", "x":32, "y":450, "fill":"#000000", text:"U", onClick: self.undo},
		{"id":"forward_text", "x":1544, "y":450, "fill":"#000000", text:"R", onClick: self.redo}
	];

	this.initialize = function()
	{
		var svg = d3.select("body")
			.append("svg")
			.attrs(self.svg_attrs)
			.classed("disable_highlight", true) // fixes all browser highlights
		svg.append("rect")
			.attrs(self.graph_surface_attrs)
			.classed("disable_highlight", true) // fixes all browswer highlights
		svg.append("g")
			.attr("id", "margin")
			.selectAll("rect")
			.data(self.buttonAttrs)
			.enter()
			.append("rect")
			.attrs({
				id: function(d) { return d.id; },
				x: function(d) { return d.x; },
				y: function(d) { return d.y; },
				height: function(d) { return d.height; },
				width: function(d) { return d.width; },
				fill: function(d) { return d.fill; },
				stroke: "black",
				'stroke-width': 2
			}).classed("disable_highlight", true) // fixes all browser highlights
			  .on("click", function(d) {
				d.onClick();
			})
			.style("cursor","pointer");
		// TEMPORARY BUTTON LABELS
		svg.append("g")
			.attr("id", "margin-texts")
			.selectAll("text")
			.data(self.buttonTexts)
			.enter()
			.append("text")
			.attrs({
				id: function(d) { return d.id; },
				x: function(d) { return d.x; },
				y: function(d) { return d.y; },
				fill: function(d) { return d.fill; },
			}).on("click", function(d) {
				d.onClick();
			})
			.text( function(d) { return d.text; })
			.style("font-size","40px")
			.style("cursor","pointer")
			.classed("disable_highlight", true); // fixes all browser highlights
		self.enableAddVertex();
		self.get_bounding_box();
	}

	this.initialize();
};

module.exports = Graph;
