import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="quantum-loader">
                <div className="quantum-core">
                    <div className="energy-field" />
                    <div className="particle-ring" />
                    <div className="quantum-sphere" />
                </div>
                <div className="quantum-waves">
                    <div className="wave" />
                    <div className="wave" />
                    <div className="wave" />
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .quantum-loader {
    width: 200px;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .quantum-core {
    width: 60px;
    height: 60px;
    position: relative;
    transform-style: preserve-3d;
  }

  .quantum-sphere {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 30% 30%,
      #ffffff,
      #4a6cf7 30%,
      #1a1a3a 70%
    );
    border-radius: 50%;
    animation: pulseSphere 2s ease-in-out infinite;
  }

  .particle-ring {
    position: absolute;
    width: 120px;
    height: 120px;
    top: -30px;
    left: -30px;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: rotateRing 3s linear infinite;
  }

  .particle-ring::before,
  .particle-ring::after {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #4a6cf7;
    top: 50%;
    transform: translateY(-50%);
  }

  .particle-ring::before {
    left: -7px;
    box-shadow: 0 0 20px #4a6cf7;
  }

  .particle-ring::after {
    right: -7px;
    box-shadow: 0 0 20px #4a6cf7;
  }

  .energy-field {
    position: absolute;
    width: 180px;
    height: 180px;
    top: -60px;
    left: -60px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent,
      #4a6cf7 120deg,
      transparent 180deg,
      #4a6cf7 300deg,
      transparent 360deg
    );
    animation: rotateField 4s linear infinite;
    opacity: 0.3;
  }

  .quantum-waves {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .wave {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #4a6cf7;
    border-radius: 50%;
    animation: expandWave 3s ease-out infinite;
    opacity: 0;
  }

  .wave:nth-child(2) {
    animation-delay: 1s;
  }

  .wave:nth-child(3) {
    animation-delay: 2s;
  }

  @keyframes pulseSphere {
    0%,
    100% {
      transform: scale(1);
      filter: brightness(1);
    }
    50% {
      transform: scale(1.1);
      filter: brightness(1.2);
    }
  }

  @keyframes rotateRing {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotateField {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  @keyframes expandWave {
    0% {
      width: 60px;
      height: 60px;
      top: 70px;
      left: 70px;
      opacity: 0.8;
    }
    100% {
      width: 200px;
      height: 200px;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }

  .quantum-sphere::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: 50%;
    filter: blur(10px);
    opacity: 0.4;
    z-index: -1;
  }

  .quantum-core::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(74, 108, 247, 0.5) 0%,
      transparent 70%
    );
    animation: pulseCore 2s ease-in-out infinite;
  }

  @keyframes pulseCore {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.2;
    }
  }`;

export default Loader;
