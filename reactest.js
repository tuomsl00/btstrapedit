

class EditTitle extends React.Component {
	
}
class Header extends React.Component {

	state = {
		title: "Click here",
		value: "Click here",
		txt: <p>sadf</p>,
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
/*
function elem(value) {
	return value;
}
*/
/*
function editContent(props) {
		
		this.setState({
			activeElement: 1,
			value: "elem.child",
		})

//		<p><textarea defaultValue={child} id="edit"></textarea><button onClick={this.saveEdit.bind(this, child, objIndex)}>save</button></p>;
		
	console.log(props);
}
*/

class Content extends React.Component {

	constructor(props) {
        super(props)
		this.handler = this.handler.bind(this);
		this.state = {
			activeElement: 0,
			selectedRow: 0,
			width: "100px",
            txt: "<p></p>",
			toggle: true
        }
    }

	editContent(e) {
		this.setState({activeElement: e.id, selectedRow: e.rowId, txt: e.child});
		console.log(this.state.width);
	//	console.log();
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
//		this.setState({selectedRow: i});
	}
	
	addCol(c) {
		console.log("Add column");
		for (let a = 0; a < c; a++) {
			contents[this.state.selectedRow].push({id: contents[this.state.selectedRow].length, rowId: this.state.selectedRow, type: 'div', cls: 'txt col-sm-4', child: 'Lorem Ipsum'});
		}
		this.setState(state => ({toggle: !state.toggle }));
	}
	
	newRow() {
		contents.splice(this.state.selectedRow, 0, []);
		for (let a = this.state.selectedRow; a < contents.length; a++) {
			for (let i = 0; i < contents[a].length; i++) {
				contents[a][i].rowId = contents[a][i].rowId+1;
			}
		}
		this.addCol(3);
	}
	
	handler(c) {
		if (c == 'col') {
			this.addCol(1);
		}
		if (c == 'row') {
			this.newRow();
		}
	}

	componentDidUpdate() {
		var w = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.s_elem)).getPropertyValue("width");
		if (this.state.width != w) {
			this.setState({width: w});
		}
		console.log(this.state.selectedRow);
	}
	
	componentDidMount() {
		
	}
	
/*
	elem(value, index, array) 
	{
	return value;
	}
*/	
//<p className="txt" onClick={this.editContent} key="1">content 1</p>
	render() {
		/*
		const lements = [<p className="txt" onClick={this.editContent.bind(this, 1)} key="1">content 1</p>, <p className="txt" onClick={this.editContent.bind(this, 2)} key="2">content 2</p>];

		const lements = [];
		*/
		let i = 0;		
		var c=3;
		return(
		<div className="container">
		{[...Array(contents.length)].map((e, i) => 
			<React.Fragment>
			<div className={i == this.state.selectedRow ? 'row selrow' : 'row'} onClick={this.selectRow.bind(this, i)} key={i}>
			{
				contents[i].map((elem, r) => 
					
					React.createElement(
					elem.type,
					{className: ((r==this.state.activeElement && i == this.state.selectedRow) ? 'col selcol' : 'col txt'), onClick: this.editContent.bind(this, elem), key: i*r+r, ref: ((r==this.state.activeElement && i == this.state.selectedRow) ? 's_elem' : '')},
					elem.child
					)
					
					
				//	<div onClick={this.editContent.bind(this, elem)} key={elem.id}>{this.actualForm(elem.child)}</div>
				)
			}		
			
			</div>
			{i == this.state.selectedRow && <ContentEditor e={this.state} addCol = {(e) => this.handler('col', e)} newRow = {(e) => this.handler('row', e)} />}
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
			toggle: true
        }
		this.editContent = this.editContent.bind(this);
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

	addCol(c) {
		console.log(this.props.e.selectedRow+i);
		for (let a = 0; a < c; a++) {
			contents[this.props.e.selectedRow].push({id: contents[this.props.e.selectedRow].length, rowId: this.props.e.selectedRow, type: 'div', cls: 'txt col-sm-4', child: 'Lorem Ipsum'});
		}
		this.setState(state => ({toggle: !state.toggle }));
	}
	
	newRow() {
		contents.splice(this.props.e.selectedRow, 0, []);
		this.addCol(3);
	}
	
	prepareEdit (state, props) {
		if (state.s) {
			return null;
		}
		return {
			s: 0,
		}
	}
	
	shouldComponentUpdate() {
		return !this.state.s;
	}
	
	componentDidUpdate() {
		if (!this.state.s) {
			this.setState({s: 1, value: this.props.e.txt});
		} else {
			this.setState( {s: 0 } );
		}
	}
	
	editValue() {
		return this.state.value;
	}
	
	componentDidMount() {
//		console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.foo)).getPropertyValue("width"));
		this.setState(state => ({toggle: !state.toggle }));
		
	}
	
	render() {
		return(
		<React.Fragment>
			<div className="row txt">
			<div className="col">			
			<textarea style={{width: (this.props.e.width)}} value={this.state.value} onChange={this.editContent} ref={input => input && input.focus()}></textarea>
			<p>
			<button onClick={this.props.addCol}>Add col</button>
			<button onClick={this.props.newRow}>New row</button>
			<select>
				<option value=".col-sm-">.col-sm-</option>
				<option value=".col-md-">.col-md-</option>
				<option value=".col-lg-">.col-lg-</option>
				<option value=".col-xl-">.col-xl-</option>
			</select>
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
			console.log(this.state.loaded);
			this.setState({loaded: 1});
		  })
		  .catch(function (error) {
			console.log(error);
		  });	
		
	}
	
	saveXML() {
		axios.post('/saveXML', {name: 'Unnamed', data: contents})
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	render() {
//	const content = this.props.xml.con;
//	const taga = this.props.xml.tag;
		return (
//			<this.props.xml.tag>{content}</this.props.xml.tag>
			<React.Fragment>
			<Header />
			<Content />

				<button onClick={this.save.bind(this)}>Save</button>
				<button onClick={this.load.bind(this)}>Load</button>
				<p>
				<button onClick={this.saveXML.bind(this)}>Save XML</button>
				</p>

			</React.Fragment>
		);
	}
	
}

const XML = [{tag: 'div', con: 'Hello'}];

//alert(XML['div']['tag']);
		var editor = "asdads";
		var contents = [];
		const classes = 'txt col';
		let i = 0;
		for (let b = 0; b < 5; b++) {
			contents[b] = [];
			for (let a = 0; a < 3; a++) {
	//			lements.push(<p className="txt" onClick={this.editContent.bind(this, a)} key={a}>content {a}</p>);
				contents[b].push({id: a, rowId: b, type: 'div', cls: classes, child: 'content '+a+'<b>asd</b>'});
	//			id.push({a});
			}
		}

ReactDOM.render(
	 <Container contents={contents}/>,
	 document.getElementById('root')
);
