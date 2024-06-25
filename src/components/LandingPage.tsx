import { Button, ButtonGroup, Container } from "react-bootstrap";

interface Props {
    changePage:(page:string) => void
  }

function LandingPage(props:Props) {
    return <Container style={{color:"white"}}>
        <Container className="justify-content-center">
            <h1 style={{alignSelf:"center"}}>Welcome to VIP ICU's Simplified Builds</h1>
            <br />
            <Container style={{padding:16, margin:0, backgroundColor: "rgba(0, 0, 0, 0.45)", color:"white", borderRadius: "1rem"}}>
                <h4>
                    In the threads above are a fairly extensive list of simplified builds that perform well in raids. Each of them is designed around the absolute minimum required to achieve good and consistent numbers in a raid environment. Each of them will have 5 instructions at most and won't require specialty food. These are foundational builds that allow players to develop the important parts of their class/build without being confined to a rotation or working on the advanced parts of their class before they get the fundamental parts down. That first 80% of your damage is much more important than the final 20% and for most people running one of these builds will be a significant upgrade. 
                </h4>
                <h4>
                    A lot of people have been going straight to Snowcrows for their builds. While their builds benchmark higher, without the right experience and knowledge to fall back on, most people will end up doing significantly less damage using those. These builds are designed to provide that experience by allowing you to get the key elements of builds correct so you have something you can fall back on with the more advanced builds. Learn to walk before you run. 
                </h4>
                <h4>
                    While these are simplified, these are still incredibly effective in raid environments allowing you to achieve good numbers while you're learning. Once you get these down, feel free to look into more advanced elements of the builds to add to what you know and If you're having any issues fill out a mentor form. 
                </h4>
                <h4>
                    This is also a good opportunity for anyone looking to diversify the roles they can play by providing simple and effective builds that can be used to fill key roles in groups.
                </h4>
            </Container>
            <br />
            <ButtonGroup style={{width:"100%"}}>
                <Button  onClick={() => props.changePage("role")}><h2>Sort By Role</h2></Button>
                <Button  onClick={() => props.changePage("class")}><h2>Sort By Class</h2></Button>
            </ButtonGroup>
        </Container>
    </Container>
}

export default LandingPage;