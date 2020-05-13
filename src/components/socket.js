// constructor(props) {
//     super(props);
//     this.socket = openSocket('ws://localhost:3000/',{
//       query :{
//         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdHZvMTIzIiwic3ViIjoiNWVhYjQyNDhkZWYyN2JhYjQ0NTJlNTFjIiwiaWF0IjoxNTg4MjgxOTI4fQ.NOKDFqsssnN8n9achncjrBCDTHJTA1X-y-1qu3nrFMc"
//       }
      

//     });
//     this.state = { msg:'' };


//   }
//   componentDidMount(){
//     this.sendChat('test message')
//     this.socket.on('chat',data =>{
//       this.setState({msg:data})
//     })
//   }
//   sendChat = (message) =>{
//     let data = {
//       message,
//       conversationId:"5eab61077a24d1b52b0143a5",
     
     
//     }
//     this.socket.emit('chat', data);
    
//   }

  
//   render(){
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p className="text-base text-green-700 leading-normal">
//             Edit <code>src/App.js</code> a
            
//             {this.state.msg}.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
  