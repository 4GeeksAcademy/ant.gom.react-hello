import React, {useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [lista, setLista] = useState([]);
	const [play, setPlay] = useState(null);
	const [posicionMusica, setposicionMusica] = useState(0)
	const audioEtiqueta = useRef(null);
	console.log(posicionMusica);
  
	  // fecth
	function getInfo() {
	  fetch("https://assets.breatheco.de/apis/sound/songs") //ir a busca
		.then((response) => {
		  console.log(response.status);
		  return response.json();
		}) //promesa 1
		.then((data) => setLista(data)) //promesa 2
		.catch((err) => console.log(err));
	  }
	  console.log(lista);
  
	  // Use effect
	  useEffect(() => {
		  getInfo();
	  }, []);
	  console.log(lista);
  
	  const setSong = (linkName, i) => {
		  audioEtiqueta.current.src = `https://assets.breatheco.de/apis/sound/${linkName}`
	  audioEtiqueta.current.play();
		  setPlay(i)
	  }
  
	  const playMusica = () => {
	  if (audioEtiqueta !== null) {
		  audioEtiqueta.current.play();
	  }
  }
  
	  const pauseMusica = () => {
	  if (audioEtiqueta !== play ) {
		  audioEtiqueta.current.pause();
	  }
  }
  
  const nextMusica = () => {
	if (posicionMusica <= lista.length -1) {
	  setposicionMusica(posicionMusica+1);
	} else { setposicionMusica(0);}
	audioEtiqueta.current.src = `https://assets.breatheco.de/apis/sound/${lista[posicionMusica].url}`
	  audioEtiqueta.current.play();
	  console.log(lista[posicionMusica].url);
  }
  
  console.log(posicionMusica);
  
  const anteriorMusica = () => {
	  if (posicionMusica > 0) {
	setposicionMusica(posicionMusica-1);
  } else { setposicionMusica(lista.length -1);}
  audioEtiqueta.current.src = `https://assets.breatheco.de/apis/sound/${lista[posicionMusica].url}`
	audioEtiqueta.current.play();
	console.log(lista[posicionMusica].url);
  }
  
	return (
	  <div className="container" >
		
		<ol>                                                        
	  
		  {lista.map((item, index) => (<li key={index} className="btn bg-info d-flex flex-column mb-3" onClick={()=>setSong(item.url,index)}>{item.name}</li>))}</ol>
		<div className="container">
		   <audio controls ref={audioEtiqueta} src="https://assets.breatheco.de/apis/sound/songs" type="audio.mp3"/><hr />
		  <button onClick={anteriorMusica}><i className="fa fa-backward"/></button>
		  <button onClick={pauseMusica}><i className="fa fa-pause"/></button>
		  <button onClick={playMusica}><i className="fa fa-play"/></button>
		  <button onClick={nextMusica}><i className="fa fa-forward"/></button>
		</div>
	  </div>
	);
  };
  
  export default Home;