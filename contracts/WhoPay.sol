pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Whopay {  
  // Struct DB for each member
  struct member {
    uint memberExpense;
    uint balance;
    bool positive;
    uint totalOws;
  }

  //group parameters
  string public groupName;
  uint public totalExpenses;
  uint public totalOwed;
  address public owner;

  //0 is open
  //1 is resolved
  //2 is closed
  uint public contractStatus;

  mapping (address => member) public memberInfo;

  address[] public memberList;

  //contructor function
  function Whopay(string name, address[] memberAddresses){
    groupName = name;
    memberList = memberAddresses;
    contractStatus = 0;
    owner = msg.sender;
  }

  //adding
  function addExpense(address member, uint expense) returns(uint){
    if (contractStatus != 0) throw;
    if(expense > 0 && validMember(member)){
      memberInfo[member].memberExpense += expense;
      totalExpenses += expense;
      return memberInfo[member].memberExpense;
    }
  }
 
  //removing
  function removeExpense(address member, uint expense) returns(uint){
    if (contractStatus != 0) throw;
    if(expense > 0 && validMember(member)){
      if((memberInfo[member].memberExpense - expense) < 0 || (totalExpenses - expense) < 0) throw;
      memberInfo[member].memberExpense -= expense;
      totalExpenses -= expense;
      return memberInfo[member].memberExpense;
    }
  }

  //checking if address is valid
  function validMember(address member) constant returns (bool) {
    if (contractStatus == 2) throw;
     for(uint i = 0; i < memberList.length; i++) {
        if (memberList[i] == member) {
          return true;
        }
      }
      return false;
  }

  //status for 1 user
  function memberStatus(address member) constant returns(uint){
    if (contractStatus == 2) throw;
    if (validMember(member)) return memberInfo[member].memberExpense;
  }

  //list group name
  function groupInfo() constant returns(string){
    if (contractStatus == 2) throw;
    return (groupName);
  }

  //status for all users
  function totalStatus() constant returns(uint){
    if (contractStatus == 2) throw;
    return totalExpenses;
  }


  //list all members
  function listMembers() constant returns(address[]){
    if (contractStatus == 2) throw;
    return memberList;
  }

  //get current contract status
  function getStatus() constant returns(uint){
    return contractStatus;
  }

  //resolve the contract and calculate each user
  function contractResolve() returns(bool){
    //only owner can resolve contract
    if(msg.sender == owner){
      if (contractStatus == 2) throw;
      //set contract to resolved
      contractStatus = 1;
      //total divided by total user > get balance per user
      uint perUser = totalExpenses / memberList.length;

      for(uint i = 0; i < memberList.length; i++) {
        //get balance
        uint paid = memberInfo[memberList[i]].memberExpense;
        uint userBalance;

        if (paid >= perUser){
          userBalance = paid - perUser;
          memberInfo[memberList[i]].positive = true;
        }
        else{
          userBalance = perUser - paid;
          memberInfo[memberList[i]].positive = false;
          memberInfo[memberList[i]].totalOws = userBalance;
          totalOwed += userBalance;
        }
        //set balance for each member
        memberInfo[memberList[i]].balance = userBalance;
      }
      return true;
    }
    else{
      return false;
    }
  }

  //add payment for member
  function memberAddPay(address member) payable{
    if (contractStatus == 2) throw;
    uint memberpays = msg.value;
    if(memberpays > memberInfo[member].totalOws) throw;
    memberInfo[member].totalOws -= memberpays;
    totalOwed -= memberpays;
    
    if (totalOwed == 0){
    //pay
      for(uint i = 0; i < memberList.length; i++) {
        if(memberInfo[memberList[i]].positive == true){
          payOut(memberList[i]);
        }
      }
    //close contract
    contractStatus = 2;
    }
  }

  //private payout function to pay out to members
  function payOut(address member) private{
    if (memberInfo[member].balance > 0){
        member.transfer(memberInfo[member].balance);
    }
  }

  //
  function memberBalance(address member) constant returns(uint, bool){
    if (contractStatus != 1) throw;
    uint amount;
    if (memberInfo[member].positive == true){
      amount = memberInfo[member].balance;
    }else{
      amount = memberInfo[member].totalOws;
    }
    return (amount,memberInfo[member].positive);
  }
}

