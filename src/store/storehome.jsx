import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-web";
import "./store.css";
import image1 from "./imgs/img1.jpg";
import image2 from "./imgs/img2.jpg";
import image3 from "./imgs/img3.jpg";
import image4 from "./imgs/img4.jpg";
import image5 from "./imgs/img5.jpg";
import { UserContext } from "../context/userContext";
import {
  BiCart,
  BiHeart,
  BiHome,
  BiNotification,
  BiSearch,
} from "react-icons/bi";
import CheckOut from "./checkout";
import Favourites from "./favourites";
import Notifications from "./notifications";
import { RiArrowTurnBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function StoreHome() {
  const { userData } = useContext(UserContext);
  const [page, setPage] = useState("home");
  return (
    <>
      {page === "home" && (
        <div className="major-container">
          <div className="store-container">
            <p className="top-p">
              Hello {userData.firstName}{" "}
              <TouchableOpacity id="search-top">
                <BiSearch color="green" />
              </TouchableOpacity>
            </p>
            <div className="top-carousel">
              {CarouseImages.map((item, index) => (
                <TouchableOpacity
                  id="carousel-item"
                  style={{ marginLeft: "20px" }}
                >
                  <img src={item} className="carousel-item-image" />
                </TouchableOpacity>
              ))}
            </div>
            <p>Categories</p>
            <div className="categories-carousel">
              {Categories.map((item, index) => (
                <TouchableOpacity
                  id={index === 0 ? "first" : "category-item"}
                  key={index}
                >
                  <span>{item.category}</span>
                </TouchableOpacity>
              ))}
            </div>
            <p>New Arrivals</p>
            <div className="new-items-carousel">
              {Categories.map((item, index) => (
                <TouchableOpacity
                  id={index === 0 ? "new-items1" : "new-items"}
                  key={index}
                ></TouchableOpacity>
              ))}
            </div>
            <p>Brands</p>
            <div className="brands-carousel">
              {topBrands.map((item, index) => (
                <TouchableOpacity
                  id={index === 0 ? "brand-items1" : "brand-items"}
                  key={index}
                >
                  <span>{item}</span>
                </TouchableOpacity>
              ))}
            </div>
            <p>Recomended for you</p>
            <div className="recommended-carousel">
              {topBrands.map((item, index) => (
                <TouchableOpacity
                  id={index === 0 ? "recomended-items1" : "recomended-items"}
                  key={index}
                ></TouchableOpacity>
              ))}
            </div>
          </div>
        </div>
      )}
      {page === "checkout" && <CheckOut />}
      {page === "favourites" && <Favourites />}
      {page === "notifications" && <Notifications />}
      <StoreNavigator setPage={setPage} page={page} />
      <Back />
    </>
  );
}
function StoreNavigator({ setPage, page }) {
  return (
    <div id="storeNavigator">
      <TouchableOpacity
        id="navItem"
        style={{ borderBottom: page === "home" ? "solid 1px green" : "" }}
        onPress={() => setPage("home")}
      >
        <BiHome size={24} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        id="navItem"
        style={{ borderBottom: page === "checkout" ? "solid 1px green" : "" }}
        onPress={() => setPage("checkout")}
      >
        <BiCart size={24} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        id="navItem"
        style={{ borderBottom: page === "favourites" ? "solid 1px green" : "" }}
        onPress={() => setPage("favourites")}
      >
        <BiHeart size={24} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        id="navItem"
        style={{
          borderBottom: page === "notifications" ? "solid 1px green" : "",
        }}
        onPress={() => setPage("notifications")}
      >
        <BiNotification size={24} color="green" />
      </TouchableOpacity>
    </div>
  );
}

function Back() {
  const navigate = useNavigate();
  return (
    <TouchableOpacity
      onPress={() => navigate("/")}
      id="go-back"
      style={{
        transform: "rotate(90deg",
        position: "fixed",
        top: "0px",
        border: "solid 1px lightgreen",
      }}
    >
      <RiArrowTurnBackLine color="green" />
    </TouchableOpacity>
  );
}

const CarouseImages = [image1, image2, image3, image4, image5];
const Categories = [
  {
    category: "Food & Beverages",
    subcategories: [
      "Fresh Produce", // Fruits, Vegetables
      "Dairy Products", // Milk, Cheese, Yogurt
      "Meat, Poultry & Seafood", // Fresh, Frozen
      "Bakery Items", // Bread, Pastries, Cakes
      "Packaged & Canned Goods", // Canned Vegetables, Sauces, Pasta
      "Frozen & Convenience Foods", // Frozen Meals, Ice Cream, Ready-to-eat
      "Snacks & Confectionery", // Chips, Nuts, Cookies, Candy
      "Beverages", // Soft Drinks, Juices, Water, Alcohol
      "Condiments & Spices", // Sauces, Oils, Seasonings
    ],
  },
  {
    category: "Personal Care & Cosmetics",
    subcategories: [
      "Skin Care", // Creams, Lotions, Sunscreens
      "Hair Care", // Shampoos, Conditioners
      "Oral Care", // Toothpaste, Toothbrushes
      "Cosmetics & Fragrances", // Makeup, Perfumes
      "Hygiene Products", // Soaps, Deodorants, Feminine Care
    ],
  },
  {
    category: "Household & Cleaning",
    subcategories: [
      "Cleaning Supplies", // Detergents, Cleaners
      "Paper Goods", // Toilet Paper, Napkins, Tissues
      "Laundry Products", // Laundry Detergents, Fabric Softeners
      "Home Essentials", // Lightbulbs, Batteries
      "Small Appliances", // Toasters, Kettles, Irons
    ],
  },
  {
    category: "Health & Wellness",
    subcategories: [
      "Medicines & First Aid", // Over-the-counter Medicines, Bandages
      "Vitamins & Supplements", // Vitamins, Herbal Supplements
      "Fitness & Nutrition", // Protein Bars, Health Drinks
      "Baby & Childcare", // Diapers, Baby Food, Baby Skincare
      "Pet Supplies", // Pet Food, Pet Toys, Accessories
    ],
  },
  {
    category: "Clothing & Accessories",
    subcategories: [
      "Men's Clothing", // Shirts, Pants, Jackets
      "Women's Clothing", // Dresses, Tops, Skirts
      "Children's Clothing", // Boys' and Girls' Clothing
      "Footwear", // Shoes, Boots, Sandals
      "Accessories", // Hats, Scarves, Jewelry
    ],
  },
  {
    category: "Electronics & Entertainment",
    subcategories: [
      "Home Electronics", // TVs, Audio Systems
      "Mobile Devices & Accessories", // Phones, Chargers, Cables
      "Computer Accessories", // Keyboards, Mice, USBs
      "Gaming & Consoles", // Video Games, Consoles
      "Movies & Music", // DVDs, Blu-rays, CDs
    ],
  },
  {
    category: "Automotive & Hardware",
    subcategories: [
      "Car Care Products", // Car Wash, Waxes, Cleaners
      "Auto Accessories", // Seat Covers, Air Fresheners
      "Tools & Hardware", // Hammers, Screws, Nails
      "Home Improvement", // Paint, Power Tools, Fixtures
    ],
  },
  {
    category: "Miscellaneous",
    subcategories: [
      "Stationery & Office Supplies", // Pens, Notebooks, Paper
      "Toys & Games", // Board Games, Toys
      "Seasonal Items", // Holiday Decorations, Seasonal Products
      "Gifts & Party Supplies", // Cards, Wrapping Paper, Balloons
    ],
  },
];
const topBrands = [
  "Apple", // Technology (smartphones, computers, tablets)
  "Amazon", // E-commerce (online retail, cloud computing)
  "Google", // Technology (search engine, software, hardware)
  "Microsoft", // Technology (software, hardware, cloud services)
  "Coca-Cola", // Beverages (soft drinks, juices, water)
  "Nike", // Apparel (sportswear, footwear, equipment)
  "Samsung", // Electronics (smartphones, TVs, appliances)
  "McDonald's", // Food & Beverage (fast food restaurants)
  "Toyota", // Automotive (cars, trucks, hybrids)
  "Procter & Gamble", // Consumer Goods (soap, cleaning supplies, personal care products)
];
