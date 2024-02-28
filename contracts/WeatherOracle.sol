// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WeatherOracle {

    mapping(uint256 => uint256) public jobResults;
    mapping(uint256 => bool) public jobStatus;

    uint256 public jobId;

    event newJob(string lat, string lon, uint256 jobId);

    function getWeather(string memory lat, string memory lon) external {
        
        emit newJob(lat, lon, jobId);
        jobId++;
    }

    function updateWeather(uint256 temp, uint256 _jobId) external {
        jobResults[_jobId] = temp;
        jobStatus[_jobId] = true;
    }
}