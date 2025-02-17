import React from 'react'
import './App.css'
import { marked } from 'marked';
import 'highlight.js/styles/monokai.css'; // Choose any theme you like
import hljs from 'highlight.js'


marked.setOptions({
  breaks: true,  // Enable single line breaks
  gfm: true,     // Enable GitHub Flavored Markdown (GFM)
  sanitize: true, // Prevent XSS (deprecated in marked v2+)
  highlight: function(code, lang){
    return hljs.highlightAuto(code).value;
  }
});

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      input:'',
      editorExpanded:false,
      previewExpanded:false
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler1 = this.clickHandler1.bind(this);
    this.clickHandler2 = this.clickHandler2.bind(this);
  }
  changeHandler(event){
    this.setState({
      input:event.target.value
    })
    
  }
  clickHandler1(){
    
    if(!this.state.editorExpanded){
      document.getElementById("editor").style.height="80vh";
      this.setState({editorExpanded:true})
      document.getElementById("container2").style.display="none"
    }

    if(this.state.editorExpanded){
      document.getElementById("editor").style.height="30vh";
      this.setState({editorExpanded:false});
      document.getElementById("container2").style.display="flex"
    }    
  }

  clickHandler2(){
    if(!this.state.previewExpanded){
      this.setState({previewExpanded:true})
      document.getElementById("container1").style.display="none"
    }

    if(this.state.previewExpanded){
      this.setState({previewExpanded:false});
      document.getElementById("container1").style.display="flex"
    }   
  }


  componentDidUpdate() {
    // Ensure syntax highlighting is applied after content updates
    const codeBlocks = document.querySelectorAll('#preview code');
    codeBlocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
    
  }

  render(){
    //this.state.input.replace("\n","<br>")
    const carrageRegex=/(\\r\\n|\\n)/g;
    const htmlString = this.state.input.replace(carrageRegex,"<br>");
    
    return(
      <>
        <div id="container1">
          <div id="editor-container">
            <div id="title-container">
              <h4 id="editor-title">editor</h4>
              <button id="editor-btn" onClick={this.clickHandler1}>here</button>
            </div>
          
          <textarea id="editor" onChange={this.changeHandler} value={this.state.input}></textarea>
          </div>
        </div>
        <div id="container2">
          <div id="preview-container">
            <div id="title-container">
            <h4 id="preview-title">preview</h4>
            <button id="preview-btn" onClick={this.clickHandler2}>here</button>
            </div>
            <div id="preview" dangerouslySetInnerHTML={{ __html: marked(htmlString) }}
            />
          </div>
        </div>
      </>
    )
  }

}

export default Editor
