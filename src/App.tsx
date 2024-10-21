import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header"
import Footer from './Footer';
import { Container, Col } from "react-bootstrap";
import background from './assets/gw2Assets/splashart/texture_crystal2_s.jpg'
import LandingPage from './components/LandingPage';
import { useState, useEffect } from 'react';
import RoleCatalogue from './components/BuildCatalogue/RoleCatalogue';
import ClassCatalogue from './components/BuildCatalogue/ClassCatalogue';
import { fetchRelics, fetchRunes, fetchSigils } from './services/GW2APIService';

const imageUrls = Object.values(import.meta.glob('./assets/gw2Assets/buildImages/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, query: '?url', import: 'default' }));
var buildImages = new Map<string, string>();
let imageStrings = imageUrls as string[];
imageStrings.map(url => buildImages.set(url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')), url));

function App() {
  const [page, setPage] = useState("home");
  const [runes, setRunes] = useState<any>([]);
  const [sigils, setSigils] = useState<any>([]);
  const [relics, setRelics] = useState<any>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const runesResult = await fetchRunes();
        setRunes(runesResult);
        const sigilsResult = await fetchSigils();
        setSigils(sigilsResult);
        const relicsResult = await fetchRelics();
        setRelics(relicsResult);
      } catch {
        console.error("There was an error loading information from the GW2API");
      }
      
    }

    loadData();
  }, []);

  function changePage(page:string | null) {
    if (page) setPage(page);
    window.scrollTo({top:0, behavior:"instant"});
  }

  return <Container data-bs-theme="dark" fluid style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover", padding: "0px"}}>
    <Col style={{minHeight:"100vh"}} className="d-flex flex-column justify-content-between">
    <Header page={page} changePage={changePage} />
    {page === "home" && <LandingPage changePage={changePage} />}
    {page === "role" && <RoleCatalogue buildImages={buildImages} runes={runes} sigils={sigils} relics={relics} />}
    {page === "class" && <ClassCatalogue buildImages={buildImages} runes={runes} sigils={sigils} relics={relics} />}
    <Footer />
    </Col>
  </Container>
}

export default App
