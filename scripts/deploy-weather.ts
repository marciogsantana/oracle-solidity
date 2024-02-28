import { ethers } from "hardhat";
import { deployWeatherOracle } from "./deploy-weather-oracle";

async function deployWeather() {
  const weatherOracle = await deployWeatherOracle();
  const weather = await ethers.deployContract("Weather", [
    weatherOracle.target,  // passado o endereço do contrato WeatherOracle parea o contrato Weather no construtor
  ]);

  await weather.waitForDeployment();

  console.log("Weather address: ", weather.target); // imprime o endereço do contrato Weather
}

deployWeather().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});