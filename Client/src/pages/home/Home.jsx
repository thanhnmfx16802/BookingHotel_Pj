import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { RenderCity } from "../../components/RenderCity";
import { RenderHotel } from "../../components/RenderHotel";
import { HotelList } from "../../components/HotelList";
import { RegisterComponent } from "../../components/RegisterComponent";
import { Footer } from "../../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <RenderCity />
      <RenderHotel />
      <HotelList />
      <RegisterComponent />
    </div>
  );
};

export default Home;
