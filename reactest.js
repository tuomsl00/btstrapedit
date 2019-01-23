
class EditTitle extends React.Component {
	
}
class Header extends React.Component {

	state = {
		title: "Click here",
		value: "Click here",
		txt: <p></p>,
	};

	changeTitle = (event) => {
		this.setState({ 
			value: event.target.value,
			txt: "edit",
			});
	}
	
	saveElementContent = (event) => {
		if(event.key == 'Enter'){
			this.setState({
				title: this.state.value,
				txt: "ready",
			});
		}
	}
	
	editTitle = () => {
//		this.setState({ txt: <input type="text" onChange={this.changeTitle} value={this.state.value} />});		
		this.setState({ txt: "edit"});		
	};
	
	render() {
		if (this.state.txt == "edit") {
		return(
			<div className="banner">
				<input type="text"
					onChange={this.changeTitle}
					onKeyPress={this.saveElementContent}
					value={this.state.value} 
					ref={input => input && input.focus()}
				/>
			</div>
		);
		} else {
		return(
			<div className="banner">
				<h1 onClick={this.editTitle}>{this.state.title}</h1>
			</div>
		);
		}
	}
}

class Content extends React.Component {

	constructor(props) {
        super(props)
		this.editContent = this.editContent.bind(this);
		this.addCol = this.addCol.bind(this);
		this.newRow = this.newRow.bind(this);
		this.delCol = this.delCol.bind(this);
		this.delRow = this.delRow.bind(this);
		this.updateStyle = this.updateStyle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
		this.state = {
			activeElement: 0,
			selectedRow: 0,
			width: "100px",
            txt: "<p></p>",
			toggle: true,
			loaded: 0,
			updateStyle: 0
        }		
    }
	
	editContent(e, event) {
//		event.preventDefault();
		console.log(event.target.id);
		document.getElementById(e.rowId+""+e.id).contentEditable = "true";
		
		this.setState({activeElement: e.id, selectedRow: e.rowId, txt: e.child});
	}
	
	editableForm = (obj) => {
		var s = obj;
		return s;
	}

	actualForm = (xml) => {
		var s;
		if (this.state.txt == "edit") {
			s = xml;
		} else {
		
			var ct;
			var p1 = xml.indexOf("<");
			var p2 = xml.indexOf(" ", p1);
			var t = xml.substring(p1+1, p2);	
			var child = "";
			p1 = xml.indexOf("class");
			p2 = xml.indexOf("\"", p1+8);
			
			ct = xml.substring(p1+7, p2);
			
			p1 = xml.indexOf(">");
			p2 = xml.lastIndexOf("</");
			
			child = xml.substring(p1+1, p2);
			
			const element = React.createElement(
				t,
				{className: ct},
				child
			);
			
			s = xml;
		//	<span className="txt">content a</span>;
		}

		return s;
	};
	
	saveEdit = (child, id) => {
		this.setState({
			title: this.state.value,
			txt: "ready",
		});
		console.log(this.state.txt);
		return 1;
	}


	selectRow(i) {
		this.setState({selectedRow: i});
	}
	
	addCol(c) {
		console.log("Add column");
		for (let a = 0; a < c; a++) {
			contents[this.state.selectedRow].push({id: contents[this.state.selectedRow].length, rowId: this.state.selectedRow, type: 'div', cls: 'txt col-sm-4', child: 'Lorem Ipsum'});
		}
		this.setState({activeElement: 0, loaded: 1});
	}
	
	newRow(c) {
		contents.splice(this.state.selectedRow, 0, []);
		for (let a = this.state.selectedRow; a < contents.length; a++) {
			for (let i = 0; i < contents[a].length; i++) {
				contents[a][i].rowId = contents[a][i].rowId+1;
			}
		}
		console.log(c);
		this.addCol(c);
	}

	delCol() {
		if (contents[this.state.selectedRow].length-1) {
			var a = this.state.activeElement;
			for (let i = a; i < contents[this.state.selectedRow].length-1; i++) {
				contents[this.state.selectedRow][i] = contents[this.state.selectedRow][i+1];
				contents[this.state.selectedRow][i].id = contents[this.state.selectedRow][i+1].id-1;
				console.log(contents[this.state.selectedRow][i]);
			}
			contents[this.state.selectedRow].pop();	
			this.setState({activeElement: (!a ? a : a-1), loaded: 1});
		} else {			
			this.delRow();
		}
	}
	
	delRow() {
		var a = this.state.selectedRow;
		for (let i = a; i < contents.length-1; i++) {
				contents[i] = contents[i+1];
		}
		
		for (let i = a; i < contents.length-1; i++) {
			for (let b = 0; b < contents[a].length; b++) {
				contents[i][b].rowId = i;
			}
		}	
		
		contents.pop();
		this.setState({selectedRow: (!a ? a : a-1), activeElement: 0, loaded: 1});
	}
	
	updateStyle(style) {
		console.log(style);
		document.execCommand(style);
		this.handleChange();
	}
	
	handleChange() {
		console.log("change");
		contents[this.state.selectedRow][this.state.activeElement].child = document.getElementById(this.state.selectedRow + "" + this.state.activeElement).innerHTML;
	}
	
	componentDidUpdate() {
		var w = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.s_elem)).getPropertyValue("width");
			var i = 0;
			
		if (this.state.loaded || this.props.loaded) {
			console.log("Update innerHTML");
			for (let row = 0; row < contents.length; row++) {
				for (let col = 0; col < contents[row].length; col++) {
					document.getElementById(row + "" + col).innerHTML = contents[row][col].child;
				}
			}
			this.setState({loaded: 0});
		}
		var copy = document.getElementById("cell");
		if (this.state.width != w) {
			this.setState({width: w});
		}
		console.log(this.state.selectedRow);
	}
	
	componentDidMount() {
		
	}
	
	render() {

		let i = 0;		
		var c=3;
		var t = 0, p = 0;
		return(
		<div className="container" id="edit">
		{[...Array(contents.length)].map((e, i) => 
			<React.Fragment>
			<div className={i == this.state.selectedRow ? 'row selrow' : 'row'} onClick={this.selectRow.bind(this, i)}>
			{
				contents[i].map((elem, r) => 
					
					React.createElement(
					elem.type,
					{
						className: ((r==this.state.activeElement && i == this.state.selectedRow) ? 'col selcol' : 'col txt'), 
						onClick: (event) => this.editContent(elem, event),
						onKeyUp: this.handleChange,
						key: i + "" + r,
						id: i + "" + r,
						ref: ((r==this.state.activeElement && i == this.state.selectedRow) ? 's_elem' : '')
					},
					"Lorem Ipsum"
					)
				)
			}		
			
			</div>
			{i == this.state.selectedRow && <ContentEditor e={this.state}
				addCol = {(e) => this.addCol(1, e)}
				newRow = {this.newRow}
				delCol = {(e) => this.delCol(e)}
				delRow = {(e) => this.delRow(e)}
				updateStyle = {this.updateStyle}
			/>}
			</React.Fragment>
			
			)
		}
		</div>
		
		);
	}

}

class Footer extends React.Component {
	render() {
		return(
			<div class="footer">
				
			</div>
		);
	}

}

class ContentEditor extends React.Component {
	
	constructor(props) {
        super(props)
		 this.state = {
			s: 0,
            value: "",
			cols: 1,
			cls: "col-sm-",
			toggle: true
        }
		this.editContent = this.editContent.bind(this);
		this.addCol = this.addCol.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeTextStyle = this.changeTextStyle.bind(this);
		this.newRow = this.newRow.bind(this);
    }
	
	editContent(event) {
	//	var objIndex = contents.findIndex((obj => obj.id == elem.id));
/*		
		if (this.state.activeElement > -1) {
			contents[this.state.activeElement].child = "ASD";
		}
	*/	
	console.log(this.props.e.txt);
		if (this.props.e.activeElement > -1) {
			contents[this.props.e.selectedRow][this.props.e.activeElement].child = event.target.value;
		}
		this.setState({s: 1, value: event.target.value});
	}
/*
	addCol(c) {
		console.log(this.props.e.selectedRow+i);
		for (let a = 0; a < c; a++) {
			contents[this.props.e.selectedRow].push({id: contents[this.props.e.selectedRow].length, rowId: this.props.e.selectedRow, type: 'div', cls: 'txt col-sm-4', child: 'Lorem Ipsum'});
		}
		this.setState(state => ({toggle: !state.toggle }));
	}
	*/
	newRow() {
		this.props.newRow(this.state.cols);
	}
	
	addCol() {
		this.props.addCol();
	}
	
	prepareEdit (state, props) {
		if (state.s) {
			return null;
		}
		return {
			s: 0,
		}
	}
	
	handleChange(ref, event) {
		if (ref == "cols") {
			this.setState({cols: event.target.value});
		}
		if (ref == "cls") {
			this.setState({cls: event.target.value});
		}
	}
	
	changeTextStyle(style) {
		console.log("style");
		this.props.updateStyle(style);
	}
	
	shouldComponentUpdate() {
		return !this.state.s;
	}
	
	componentDidUpdate() {
		if (!this.state.s) {
			this.setState({s: 1, value: this.props.e.txt});
		} else {
			this.setState( {s: 0} );
		}
	}
	
	componentDidMount() {
//		console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.foo)).getPropertyValue("width"));
		this.setState(state => ({toggle: !state.toggle }));
		
	}
	render() {
	var i = 0;
		return(
		<React.Fragment>
			<div className="row txt">
			<div className="col">			
			{/*	<textarea style={{width: (this.props.e.width)}} value={this.state.value} onChange={this.editContent} ref={input => input && input.focus()}></textarea> */}
			
			<p>
				<button onClick={() => this.changeTextStyle("bold")}>b</button>
				<button onClick={() => this.changeTextStyle("italic")}><i>i</i></button>
				<button onClick={() => this.changeTextStyle("underline")}><u>u</u></button>
			</p>
			
			<p>
			<button onClick={this.addCol}>Add col</button>
			<select value={this.state.cls} onChange={(event) => this.handleChange("cls", event)}>
				<option value=".col-sm-">.col-sm-</option>
				<option value=".col-md-">.col-md-</option>
				<option value=".col-lg-">.col-lg-</option>
				<option value=".col-xl-">.col-xl-</option>
			</select>
			<button onClick={this.newRow}>New row</button> with
			<select value={this.state.cols} onChange={(event) => this.handleChange("cols", event)}>
			{[...Array(9)].map((e, i) => <option value={i+1}>{i+1}</option>)}
			</select>
			columns
			</p>
			<p>
				<button onClick={this.props.delCol}>Delete col</button>
			</p>
			<p>
				
			</p>
			</div>
			</div>
		</React.Fragment>
		);
	}
}


class Container extends React.Component {
	constructor(props) {
        super(props)
		this.state = {
            txt: "Initial State2",
			loaded: 0
        }
    }
	
	
	save() {
		console.log(contents[0][0].rowId);
		var i = 0;
		
		for (let row = 0; row < contents.length; row++) {
			for (let col = 0; col < contents[row].length; col++) {
				contents[row][col].child = document.getElementById(row + "" + col).innerHTML;
			}
		}
		
		axios.post('/save', {name: {name: 'Unnamed'}, data: contents})
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	load() {
		console.log("/load");
		console.log(this.state.load);

		axios.get('/load')
		  .then( (response) => { 
			console.log(response.data);
			var id = 0, rowId = 0;
			contents = [];
			console.log(response.data[0].rowId);	
			for (let i = 0; i < response.data.length; i++) {
				if (!response.data[i].id) {
					contents[rowId++] = [];
				}
				contents[rowId-1].push(response.data[i]);
			}
			console.log(contents.length);

			this.setState({loaded: 1});
		  })
		  .catch(function (error) {
			console.log(error);
		  });	
		
	}
	
	saveXML() {
		var i = 0;
		for (let row = 0; row < contents.length; row++) {
			for (let col = 0; col < contents[row].length; col++) {
				contents[row][col].child = document.getElementById(row + "" + col).innerHTML;
			}
		}
		axios.post('/saveXML', {name: 'Unnamed', data: contents})
		  .then(function (response) {
			document.getElementById("xml").value = response.data;
			
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	componentDidUpdate() {
		if (this.state.loaded) {
			this.setState({loaded: 0});
		}
	}
	
	render() {
		return (
			<React.Fragment>
			<Header />
			<Content loaded={this.state.loaded}/>

				<button onClick={this.save.bind(this)}>Save</button>
				<button onClick={this.load.bind(this)}>Load</button>
				<p>
				<button onClick={this.saveXML.bind(this)}>Save XML</button>
				</p>
				<textarea id="xml" className="xml" readOnly></textarea>

			</React.Fragment>
		);
	}
	
}

		var contents = [];
		const classes = 'txt col';
		let i = 0;
		for (let b = 0; b < 5; b++) {
			contents[b] = [];
			for (let a = 0; a < 3; a++) {
				contents[b].push({id: a, rowId: b, type: 'div', cls: classes, child: 'Lorem ipsum'});
			}
		}

ReactDOM.render(
	 <Container contents={contents}/>,
	 document.getElementById('root')
);
