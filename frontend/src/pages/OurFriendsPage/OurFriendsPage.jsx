import sponsors from "../../hardcodeData/sponsors.json";
import SponsorCard from "../../components/SponsorCard";

const OurFriendsPage = () => {
    
    return(
        <section>
            <h2>Our friend</h2>
            <ul>
                {sponsors.map((sponsor, index) => <li key={index}>
                    <SponsorCard obj = {sponsor}/>
                </li>)}
            </ul>
        </section>
    )
};

export default OurFriendsPage;
