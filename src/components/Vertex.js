import { ouuid } from 'utils';
import Edge from 'Edge'


var Vertex = function(x, y, graph, initial_color)
{
	var self = this;
	this.graph = graph;
	this.id = ouuid("vertex");

	this.initial_color; // "dark" or "light"
	this.state = "initial"; // "initial", "highlighted", or "flipped"
	this.static_state; // "initial" or "flipped"

	this.initial_appearance;
	this.highlighted_appearance;
	this.flipped_appearance;
	this.static_state;

	this.colors = function(initial_color) {
		if (initial_color === "dark")
		{
			this.initial_appearance = {"fill":"#000000", "stroke":"#ffffff"};
			this.highlighted_appearance = {"fill":"#000000", "stroke":"#ff0000"};
			this.flipped_appearance = {"fill":"#ffffff", "stroke":"#ffffff"};
			this.static_state = "flipped";
		}
		else
		{
			this.initial_appearance = {"fill":"#ffffff", "stroke":"#ffffff"};
			this.highlighted_appearance = {"fill":"#ffffff", "stroke":"#ff0000"};
			this.flipped_appearance = {"fill":"#000000", "stroke":"#ffffff"};
			this.static_state = "initial";
		}
		this.initial_color = initial_color;
	}

	this.colors(initial_color);

	// Attributes for d3 graphics only, initial settings.
	this.attrs = {
		"graph_id":self.graph.graph_id,
		"id":this.id,
		"cx":x,
		"cy":y,
		"r":40,
		"fill":this.initial_appearance["fill"],
		"stroke":this.initial_appearance["stroke"],
		"stroke-width": 5,
		"vertex_num":++Object.keys(self.graph.vertices).length,
		"x_text_offset": 30,
		"y_text_offset": 45,
	};

	// Stores a subset of attrs to be modified on create().
	this.appearance_attrs;

	this.edges = {};
	this.edges_endpoints = {};

	this.edge_keys = function()
	{
		return Object.keys(self.edges);
	};

	this.edges_as_array = function()
	{
		var ea =[];
		self.edge_keys().forEach(function(key)
		{
			ea.push(self.edges[key]);
		});
		return ea;
	};

	this.onClick = function()
	{
		if (self.graph.mode === "build")
		{
			if (self.graph.highlighted !== null && self.graph.highlighted === self.attrs.id)
			{
				var keys = self.edge_keys();
				for (var i=0; i < keys.length; i++)
				{
					self.edges[keys[i]].destroy();
				}
				self.destroy();
				self.graph.stash();
				return;
			}
			// graph.highlighted is a Vertex.attrs.id
			// graph.vertices is a dictionary of Vertex.attrs.id:Vertex
			if (self.graph.highlighted !== null && self.graph.highlighted !== self.attrs.id)
			{
				// Look at all the edges in the second vertex clicked; if one of them already has the highlighted vertex as one of
				// its connections, then we don't make a new edge.
				var vertex_1 = self.graph.vertices[self.graph.highlighted],
					eaa = self.edges_as_array(),
					eaalen = eaa.length;
				for (var i = 0; i < eaalen; i++)
				{
					if (eaa[i].vertex_keys[0] === self.graph.highlighted || eaa[i].vertex_keys[1] === self.graph.highlighted)
					{
						vertex_1.draw("initial")
						self.graph.highlighted = null;
						self.graph.stash();
						return;
					}
				}
				// Create a new edge.
				var edge = new Edge(vertex_1, self, self.graph);
				edge.create();
				self.graph.stash();
			}
			else
			{
				self.draw("highlighted");
				self.graph.stash();
			}
		}
		else
		{
			// When in play mode, adds clicked vertex to pressing_sequence.
			if (self.state !== self.static_state) {
				self.graph.pressing_sequence[self.graph.pressing_sequence.length]=self.attrs.vertex_num;
			}
			self.graph.modifyNeighborhood(self);
			self.graph.stash();
		};
	};

	// Flips the color on a highlighted Vertex in build mode.
	this.flip_and_swap_build = function() {
		if (this.initial_color === "dark") {
			this.colors("flipped");
		} else {
			this.colors("dark");
		}
		this.draw("initial");
	}

	this.flip_state_play = function()
	{
		self.state === "initial" ? self.draw("flipped") : self.draw("initial");
	}

	// Highlightd  the "Color" button text to indicate the flipped color on a highlighted vertex
	this.check_color_button_match = function()
	{
		if (this.flipped_appearance.fill == "#000000" && self.graph.new_vertex_color == "light")
		{
			self.graph.change_color_button_text_color("dark");
		}
		else if (this.flipped_appearance.fill != "#000000" && self.graph.new_vertex_color =="dark")
		{
			self.graph.change_color_button_text_color("light");
		}
	}

	this.draw = function(arg)
	{
		var vertex = d3.select("#" + this.id);
		var vertexG = d3.select("#vertex_group" + this.id);
		switch(arg)
		{
			case "initial":
				this.state = arg;
				this.appearance_attrs = this.initial_appearance;
				vertex.remove();
				vertexG.remove();
				this.create();
				return;
			case "highlighted":
				this.state = arg;
				this.appearance_attrs = this.highlighted_appearance;
				vertex.remove();
				vertexG.remove();
				this.create();
				this.check_color_button_match();
				this.graph.highlighted = this.id;
				return;
			case "flipped":
				this.state = arg;
				this.appearance_attrs = this.flipped_appearance;
				vertex.remove();
				vertexG.remove();
				this.create();
				return;
		}
	};

	this.edgeEnds = {}; // Saves state for drag handler in create() below.
	this.dragging = false; // Saves state for drag handler in create() below.

	this.delete_g = function()
	{
		d3.select("#vertex_group" + this.id).remove();
	}

	this.add_g = function()
	{
		this.delete_g();
		d3.select("svg")
			.append("g")
			.attr("id", "vertex_group"+this.id)
	}


	this.create = function()
	{
		this.add_g();
		// Add SVG graphic to the DOM.
		d3.select("#vertex_group"+this.id)
			.append("circle")
			.attrs(this.attrs)
			.attrs(this.appearance_attrs)
			.on("click", this.onClick)
			.call(d3.drag(this)
				.on("drag", function()
				{
					self.dragging = true;
					var mPos = d3.mouse(this);
					// Stay in bounding box.
					if(mPos[0] < self.graph.bounding_box[0]) (mPos[0] = self.graph.bounding_box[0]);
					if(mPos[1] < self.graph.bounding_box[1]) (mPos[1] = self.graph.bounding_box[1]);
					if(mPos[0] > self.graph.bounding_box[2]) (mPos[0] = self.graph.bounding_box[2]);
					if(mPos[1] > self.graph.bounding_box[3]) (mPos[1] = self.graph.bounding_box[3]);
					// Drag the Vertex.
					d3.select(this).attrs({cx:mPos[0], cy:mPos[1]});
					// Drag the Vertex_num
					d3.select("#vertex-number" + self.attrs.id)
						.attrs({x:mPos[0] + self.attrs.x_text_offset, y:mPos[1] + self.attrs.y_text_offset});
					// Drag the appropriate endpoint of each Edge attached to the Vertex.
					var keys = self.edge_keys();
					for (var i=0; i < keys.length; i++)
					{
						var x_y_attrs_hash = self.edges_endpoints[keys[i]];
						var nh = {};
						nh[x_y_attrs_hash["x"]] = mPos[0];
						nh[x_y_attrs_hash["y"]] = mPos[1];
						d3.select("#" + self.edges[keys[i]].attrs.id).attrs(nh);
					}
				})
				.on("end", function()
				{
					/*
						The "click" and "drag end" handlers BOTH fire on click to an object (click last, it seems). The "click" handler
						does not fire when the "drag" handler is invoked. Therefore, we only update the DOM and stash the graph state in
						the event that the "drag" handler is invoked, otherwise we get two stashes on a click to highlight a vertex, for
						example.
					*/
					if (self.dragging === true)
					{
						// On release, set the location attributes are stored outside the SVG representation of the Vertex and Edges.
						self.attrs.cx = d3.select(this).attr("cx");
						self.attrs.cy = d3.select(this).attr("cy");

						var keys = self.edge_keys();
						for (var i=0; i < keys.length; i++)
						{
							var x_y_attrs_hash = self.edges_endpoints[keys[i]];
							self.edges[keys[i]].attrs[x_y_attrs_hash["x"]] = self.attrs.cx;
							self.edges[keys[i]].attrs[x_y_attrs_hash["y"]] = self.attrs.cy;
						}
						self.edgeEnds = {};
						self.dragging = false;
						self.graph.stash();
					}
				})
			);
		// Adds the Vertex to Graph.vertices{}.
		self.graph.vertices[self.attrs.id] = self;
		self.addNum();
	};

	// Destroy all references to this Vertex.
	// Note that associated Edge objects must be destroyed using Edge.destroy() first.
	this.destroy = function()
	{
		this.removeNum();
		var num = self.attrs.vertex_num;
		this.renumberNum(num);
		// Removes SVG graphic from the DOM.
		self.graph.change_color_button_text_color(initial_color);
		d3.select("#" + this.attrs.id).remove();
		// Removes this Vertex from the associated Graph.
		delete self.graph.vertices[self.attrs.id];
		self.graph.highlighted = null;
		this.delete_g();
	};

	this.addNum = function()
	{
		self.removeNum();

		var newX = +self.attrs.cx + self.attrs.x_text_offset;
		var newY = +self.attrs.cy + self.attrs.y_text_offset;

		d3.select("#vertex_group"+this.id)
			.append("text")
			.attr("id", "vertex-number"+this.attrs.id)
			.attr("x", newX)
			.attr("y", newY)
			.attr("fill", "#ff0000")
			.text(self.attrs.vertex_num)
			.style("font-size", "25px");
	}

	this.removeNum = function()
	{
		// Removes SVG text/number graphic
		d3.select("#vertex-number" + this.attrs.id).remove();
	}

	this.renumberNum = function(num)
	{
		for(var vertex in self.graph.vertices){
			if (self.graph.vertices[vertex].attrs.vertex_num > num)
			{
				self.graph.vertices[vertex].attrs.vertex_num--;
				self.graph.vertices[vertex].drawNum();
			}
		}
	}

	this.drawNum = function()
	{
		self.removeNum();
		self.addNum();
	}

	this.create();
}

module.exports = Vertex;
