import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faShoppingCart, faDollarSign, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

// Keyframes for animated gradient background
const animateBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const DashboardContainer = styled.div`
  text-align: center;
  padding: 60px;
  background: linear-gradient(-45deg, #6a0dad, #1e90ff, #4b0082, #8a2be2);
  background-size: 400% 400%;
  animation: ${animateBackground} 10s ease infinite;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DashboardTitle = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const StatsContainer = styled.div`
  color: #ffffff;
  margin-bottom: 40px;

  h2 {
    margin-bottom: 20px;
  }

  p {
    font-size: 1.5rem;
    margin: 5px 0;
  }
`;

const ServicesSection = styled.div`
  margin-top: 20px;
  width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedServiceItem = styled.div`
  background: linear-gradient(-45deg, #6a0dad, #1e90ff, #4b0082, #8a2be2);
  background-size: 400% 400%;
  animation: ${animateBackground} 8s ease infinite;
  padding: 15px 20px;
  margin: 10px 0;
  border-radius: 10px;
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  font-weight: bold;
`;

const IconLinksContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const IconLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: #ff69b4; /* Change color on hover */
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #ff69b4;
  font-size: 1.5rem;
  margin-right: 8px;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 60px;
  left:10px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #ffffff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6347; 
  }
`;


const UserDashboard = () => {
  const [username, setUsername] = useState("Guest");
  const [monthlyData, setMonthlyData] = useState({ orders: [], spent: [], services: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchMonthlyData = async () => {
      try {
        const response = await fetch(`orders/${username}`); 
        const data = await response.json();
        setMonthlyData(data);
      } catch (error) {
        console.error("Failed to fetch monthly data:", error);
      }
    };

    fetchMonthlyData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page
  };

  const generateMonthLabels = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames;
  };

  const data = {
    labels: generateMonthLabels(),
    datasets: [
      {
        label: 'Total Spent',
        data: monthlyData.spent,
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <DashboardContainer>
      <DashboardTitle>Hello, {username}</DashboardTitle>

      <IconLinksContainer>
        <IconLink to="/productList">
          <StyledIcon icon={faList} />
        </IconLink>
        <IconLink to="/cart">
          <StyledIcon icon={faShoppingCart} />
        </IconLink>
        <IconLink to="/payment">
          <StyledIcon icon={faDollarSign} />
        </IconLink>
        <IconLink to="/blog">
          <StyledIcon icon={faHeart} />
        </IconLink>
      </IconLinksContainer>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

      <StatsContainer>
        <h2>Your Spendings Overview</h2>
        <p>Total Spent: ${monthlyData.spent.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</p>
      </StatsContainer>

      <div style={{ width: '600px', height: '300px' }}>
        <Line data={data} options={{ responsive: true }} />
      </div>

      <ServicesSection>
        <h2>Your Ordered Services</h2>
        {monthlyData.services.map(service => (
          <AnimatedServiceItem key={service.id}>
            <span>{service.name}</span>
            <span>${service.price.toFixed(2)}</span>
          </AnimatedServiceItem>
        ))}
      </ServicesSection>

    </DashboardContainer>
  );
};

export default UserDashboard;
