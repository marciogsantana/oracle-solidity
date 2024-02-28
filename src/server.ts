import axios from "axios";
import { ethers } from "hardhat";

const weatherAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // enderço do contrato wetheroraculo  que foi deployado

async function callApi(lat: string, log: string) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&units=metric&appid=34d1b6206a66637b6d2ccbe2c2890987`  // api para pegar a temperatura
    );
    return data?.main.temp;  // pegar a temperatura dentro do objeto data/main 
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  console.log("running Oracle");

  const weatherOracle = await ethers.getContractAt(  // pega o contrato WeatherOracle na rede
    "WeatherOracle",
    weatherAddress
  );

  const newJob = weatherOracle.filters.NewJob();  // fica escutando o evento NewJob do contrato WeatherOracle
  weatherOracle.on(newJob, async (data: any, error: any) => {
    console.log("initJob");
    if (error) {
      console.log("error: ", error);
      return;
    }
    const { lat, lon } = data.args;
    const temp = await callApi(lat, lon); // temp recebe a temperatura que foi pega da api

    console.log("temp: ", temp);

    const jobId = await weatherOracle.jobId(); // pega o jobId do contrato WeatherOracle

    console.log("jobId: ", jobId);

    await weatherOracle.updateWeather(temp, jobId);  // chama o metodo updateWeather do contrato WeatherOracle passando a temperatura e o jobId
    const jobResults = await weatherOracle.jobResults(jobId);
    console.log("jobResults: ", jobResults);
  });
}

main();