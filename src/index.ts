import { ethers } from "hardhat";

const weatherAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"  // endereço do contrato Weather

const lat = "-8.033862706436462";  // latitude e longitude atual de uma cidade
const lon = "-34.91740605416537";

async function main() {
  try {
    const weather = await ethers.getContractAt("Weather", weatherAddress); // pega o contrato Weather na rede

    // const getWeather = await weather.getWeather(lat, lon); // chama o metodo getWeather do contrato Weather passando a latitude e longitude
    // await getWeather.wait(); //agurdar finalizar

    // const temp = await weather.temp();
    // await temp.wait();

    const tempResult = await weather.tempResult();
    console.log("WEATHER temp: ", tempResult);
  } catch (error: any) {
    console.log("ERROR: ", error?.message);
  }
}

main().then(() => {
  process.exit();
});