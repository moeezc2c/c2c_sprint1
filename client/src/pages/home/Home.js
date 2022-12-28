import React from "react";
import MainSlider from '../../components/mainSlider/mainSlider';
import Services from '../../components/Services/services';
import RecentlyViewed from '../../components/recentlyViewed/recentlyViewed';
import HomePageVideo from '../../components/homePageVideo/homepagevideo';
import FindCyber from '../../components/findCyber/findcyber';

const Home = () => {
  return (
    <React.Fragment>
      <MainSlider />
      {/* <Services /> */}
      {/*<RecentlyViewed />*/}
      <HomePageVideo />
      <FindCyber />
    </React.Fragment>
  );
};

export default Home;
