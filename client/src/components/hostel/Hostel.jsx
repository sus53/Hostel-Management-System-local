import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hosteldetail.scss";
import { getVerifiedHostel } from "../../function/Hostel";
import { useDispatch } from "react-redux";
import { selectHostel } from "../../redux/Index";
import StarIcon from "@mui/icons-material/Star";
import HostelImg from "../../assets/img/HostelImg.jpg";
import MultiRangeSlider from "multi-range-slider-react";

export const Hostel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hostels, setHostels] = useState([]);
    const [filteredHostels, setFilteredHostels] = useState([]);
    const [filter, setFilter] = useState({});
    const [isFilter, setIsFilter] = useState(false);
    const [hoverStar, setHoverStar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getHostels = async () => {
        const res = await getVerifiedHostel();
        setHostels(res);
    };

    const seeMoreHandler = (e, hostel) => {
        e.preventDefault();
        dispatch(selectHostel({ hostel }));
        navigate("/hosteldetail");
    };

    const filterHandler = () => {
        // Filter hostels based on the filter state
        let filteredHostels = hostels.filter(hostel => {
            // Check if hostel matches selected gender
            if (filter.sex && filter.sex.length > 0 && !filter.sex.includes(hostel.sex)) {
                return false;
            }

            // Check if hostel matches selected bed types
            if (filter.bed && filter.bed.length > 0) {
                let matched = false;
                for (let bedType of filter.bed) {
                    if (Object.keys(hostel.floor).some(floor => Object.keys(hostel.floor[floor]).some(room => room === bedType))) {
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    return false;
                }
            }

            // Check if hostel matches selected price range
            if (filter.minPrice && hostel.floor && Object.values(hostel.floor).some(floor => {
                return Object.values(floor).some(room => {
                    return room.price >= filter.minPrice && room.price <= filter.maxPrice;
                });
            })) {
                return true;
            }

            // Return true for hostels that passed all filters
            return true;
        });
        setIsFilter(true)
        // Update the state with the filtered hostels
        setFilteredHostels(filteredHostels);
        console.log(filter)
        console.log(filteredHostels)
    };


    const genderChangeHandler = (e) => {
        const { value, checked } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            sex: checked ? [...(prevFilter.sex || []), value] : prevFilter.sex.filter(item => item !== value)
        }));
    };

    const bedChangeHandler = (e) => {
        const { value, checked } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            room: checked ? [...(prevFilter.room || []), value] : prevFilter.room.filter(item => item !== value)
        }));
    };

    useEffect(() => {
        getHostels();
    }, []);

    const hostelsPerPage = 5;
    const indexOfLastHostel = currentPage * hostelsPerPage;
    const indexOfFirstHostel = indexOfLastHostel - hostelsPerPage;
    const currentHostels = isFilter ? filteredHostels.slice(indexOfFirstHostel, indexOfLastHostel) : hostels.slice(indexOfFirstHostel, indexOfLastHostel);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="hostel-boys">
                <div className="hostel-filter">
                    <h3>Filter</h3>
                    <div className="filterGroup">
                        <label htmlFor="slider">Price: </label>
                        <MultiRangeSlider
                            style={{ border: "none", boxShadow: "none" }}
                            ruler={false}
                            min={0}
                            max={10000}
                            maxValue={10000}
                            onInput={(e) => {
                                setFilter(prev => ({ ...prev, minPrice: e.minValue, maxPrice: e.maxValue }));
                            }}
                        />
                        <div className="d-flex justify-content-between" >
                            <div>min :  {filter.minPrice}</div>
                            <div>max :  {filter.maxPrice}</div>
                        </div>
                    </div>
                    <div className="filterGroupGender">
                        <label>Gender: </label>
                        <div className="genderGroup">
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Boys"
                                    checked={filter.sex?.includes("Boys")}
                                    onChange={(e) => genderChangeHandler(e)}
                                />
                                <label>Boys</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Girls"
                                    checked={filter.sex?.includes("Girls")}
                                    onChange={(e) => genderChangeHandler(e)}
                                />
                                <label>Girls</label>
                            </div>
                        </div>
                    </div>
                    <div className="filterGroup">
                        <label>Seaters: </label>
                        <div className="genderGroup">
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Single"
                                    checked={filter.bed?.includes("Single")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>One</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Double"
                                    checked={filter.bed?.includes("Double")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>Two</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Triple"
                                    checked={filter.bed?.includes("Triple")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>Three</label>
                            </div>
                        </div>
                    </div>
                    <div className="star-rating">
                        <label>Rating: </label>
                        <div className="starGroupp">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className={
                                        i < hoverStar ? "star" : "inlinestar"
                                    }
                                    onClick={() =>
                                        setFilter({ ...filter, rating: i + 1 })
                                    }
                                    onMouseEnter={() => setHoverStar(i + 1)}
                                    onMouseLeave={() =>
                                        setHoverStar(filter.rating)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={(e) => filterHandler(e)}
                        className="searchBTN"
                    >
                        Search
                    </button>
                </div>
                <div className="hostelWrapper">
                    {currentHostels.map((hostel) => (
                        <div className="hostel-boys-item" key={hostel._id}>
                            <div>
                                <img
                                    src={
                                        hostel.imagepath1 &&
                                            hostel.imagepath1 !== "undefined"
                                            ? `http://localhost:5000/assets/${hostel.imagepath1}`
                                            : HostelImg
                                    }
                                />
                            </div>
                            <div className="hostel-highlight">
                                <div className="highlight-one">
                                    <h2>{hostel.title}</h2>
                                    <p className="address-hostel">
                                        {hostel.location}
                                    </p>
                                    <p className="hostel-offer">
                                        Wifi&middot;24hrElectricity&middot; CCTV
                                        &middot;Hotwater
                                    </p>
                                    <p className="sex">{hostel.sex}</p>
                                </div>
                                <div className="highlight-two">
                                    <div className="btn-see-more">
                                        <button
                                            onClick={(e) =>
                                                seeMoreHandler(e, hostel)
                                            }
                                        >
                                            {`See More >>`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {hostels.length > hostelsPerPage && (
                        <ul className="pagination-list">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {[
                                ...Array(
                                    Math.ceil(hostels.length / hostelsPerPage)
                                ),
                            ].map((_, index) => (
                                <li key={index} className="pagination-item">
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={
                                            currentPage === index + 1
                                                ? "pagination-link active"
                                                : "pagination-link"
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                    currentPage ===
                                    Math.ceil(hostels.length / hostelsPerPage)
                                }
                            >
                                Next
                            </button>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};
