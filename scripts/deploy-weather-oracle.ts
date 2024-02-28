import { ethers } from "hardhat";

export async function deployWeatherOracle() {
  const weatherOracle = await ethers.deployContract("WeatherOracle");

  await weatherOracle.waitForDeployment();
  console.log("Weather Oracle address: ", weatherOracle.target); // tareget imprmime o endereço do contrato para o metodo de deploycontract este metodo substitui o factory.deploy
  return weatherOracle;
}