pragma solidity ^0.4.6;
// We have to specify what version of compiler this code will compile with

contract Whopay {
  //struct db for contract resolving
  struct memberOw{
    uint amount;
  }
  
  // Struct DB for each member
  struct member {
    uint memberPaid;
    uint balance;
    bool positive;
    mapping (address => memberOw) memberOwing;
  }

  //group parameters
  string public groupName;
  string public groupDescription;
  uint public totalAmount;

  mapping (address => member) public memberInfo;

  address[] public memberList;

  //contructor function
  function Whopay(string name, string description, address[] memberAddresses){
    groupName = name;
    groupDescription = description;
    memberList = memberAddresses;
  }

  //adding
  function memberPay(address member, uint paid) returns(uint){
    if(paid > 0 && validMember(member)){
      memberInfo[member].memberPaid += paid;
      totalAmount += paid;
      return memberInfo[member].memberPaid;
    }
  }
 
  //removing
  function memberReduce(address member, uint paid) returns(uint){
    if(paid > 0 && validMember(member)){
      if((memberInfo[member].memberPaid - paid) < 0 || (totalAmount - paid) < 0) throw;
      memberInfo[member].memberPaid -= paid;
      totalAmount -= paid;
      return memberInfo[member].memberPaid;
    }
  }

  //checking if address is valid
  function validMember(address member) constant returns (bool) {
     for(uint i = 0; i < memberList.length; i++) {
        if (memberList[i] == member) {
          return true;
        }
      }
      return false;
  }

  //status for 1 user
  function memberStatus(address member) constant returns(uint){
    if (validMember(member)) return memberInfo[member].memberPaid;
  }

  function groupInfo() constant returns(string,string){
    return (groupName,groupDescription);
  }

  //status for all users
  function totalStatus() constant returns(uint){
    return totalAmount;
  }

  function listMembers() constant returns(address[]){
    return memberList;
  }

  function contractResolve() returns(bool){
    //total divided by total user > get balance per user
    uint perUser = totalAmount / memberList.length;

    for(uint i = 0; i < memberList.length; i++) {
      //get balance
      uint paid = memberInfo[memberList[i]].memberPaid;
      uint userBalance;

      if (paid > perUser){
        userBalance = paid - perUser;
        memberInfo[memberList[i]].positive = true;
      }
      else{
        userBalance = perUser - paid;
        memberInfo[memberList[i]].positive = false;
      }
      //set balance for each member
      memberInfo[memberList[i]].balance = userBalance;
    }
    //check balance against other users -> for loop
    //to pay address + topay
    return true;
  }

  function getOwed(){
    for(uint i = 0; i < memberList.length; i++) {
    //loop over members
    //if member = negative
      if(memberInfo[memberList[i]].positive == false){
        //loop over other members
        for(uint j = 0; j < memberList.length; j++) {
          //only against other positive members
          if(memberInfo[memberList[j]].positive == true && memberInfo[memberList[j]].balance > 0 && memberInfo[memberList[i]].balance > 0){
            //add payments 
            //reduce positive on other member
            if (memberInfo[memberList[j]].balance > memberInfo[memberList[i]].balance){
              memberInfo[memberList[j]].balance -= memberInfo[memberList[i]].balance;
              memberInfo[memberList[i]].memberOwing[memberList[j]].amount = memberInfo[memberList[i]].balance;
              memberInfo[memberList[i]].balance = 0;
            }
            else{
              memberInfo[memberList[i]].balance -= memberInfo[memberList[j]].balance;
              memberInfo[memberList[i]].memberOwing[memberList[j]].amount = memberInfo[memberList[j]].balance;
              memberInfo[memberList[j]].balance = 0;
            }
          }
        }
      }
    }
  }

  //test functions
  function userBalance(address member) constant returns(uint, bool){
    return (memberInfo[member].balance,memberInfo[member].positive);
  }
}

