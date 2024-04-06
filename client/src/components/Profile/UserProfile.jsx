import "./UserProfile.scss";
import GreenYard from "../../assets/img/GreenYard.jpeg";
import { useSelector } from "react-redux";
import { GetPayment } from "../../function/Payment";
import { useEffect, useState } from "react";
import { getHostel } from "../../function/Hostel";

const UserProfile = () => {

  const [roomBooked, setRoomBooked] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hostels, setHostels] = useState([]);

  const user = useSelector(state => state.user);

  const fetchPaymentHostel = async () => {
    const paymentsData = await GetPayment();
    const filterData = paymentsData.filter(hostel => hostel.email === user.email);
    countBookedInfo(filterData);
    fetchHostel(filterData)
  }

  const fetchHostel = async (data) => {
    let hostelArr = data.map(hostel => hostel.ownerEmail);
    let emails = new Set(hostelArr);
    const hostelData = await getHostel({ email: [...emails] });
    setHostels(hostelData);
    console.log(hostelData)
  }

  const countBookedInfo = (data) => {
    setRoomBooked(0);
    setTotalPrice(0)
    data.map((payment) => (
      Object.keys(payment.room).map((floorIndex) => (
        Object.keys(payment.room[floorIndex]).map((roomName) => {
          setRoomBooked(prev => prev + 1)
          setTotalPrice(prev => prev + +payment.room[floorIndex][roomName].price)
        })
      ))
    ))
  }

  useEffect(() => {
    fetchPaymentHostel();
  }, [])

  return (
    <div className="userProfile">
      <div className="dashboardWrapper">
        <div className="dashboardBox">
          <h3>Room Booked</h3>
          <h1>{roomBooked}</h1>
        </div>
        <div className="dashboardBox">
          <h3>Total Amount Paid(Rs.)</h3>
          <h1>{totalPrice}</h1>
        </div>
      </div>
      <div className="hostelFooterWrapper">
        <div className="basicInfoWrapper">
          <div className="basicInfo">
            <div className="infogrp">
              <h5>Hostel Name:</h5>
              <h4>Green Boys Hostel</h4>
            </div>
            <div className="infogrp">
              <h5>Location:</h5>
              <h4>Kupondole, Lalitpur</h4>
            </div>
            <div className="infogrp">
              <h5>Seater Info:</h5>
              <h4>Two Seater</h4>
            </div>
            <div className="infogrp">
              <h5>Floor Info:</h5>
              <h4>Second Floor</h4>
            </div>
            <div className="infogrp">
              <h5>Booked Date:</h5>
              <h4>2080/01/25</h4>
            </div>
          </div>
        </div>
        <div className="hostelBanner">
          <img src={GreenYard} alt="" />
          <div className="hostelInfo">
            <h1>Green Yard Boys Hostel</h1>
            <h4>Home Away From Home</h4>
            <p>
              We serve you with the best food, clean and family environment.
            </p>
            <div className="contactInfo">
              <p>9810478448</p>
              <p>greenyard25@yopmail.com</p>
              <p>Kupondole, Lalitpur</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserProfile;
