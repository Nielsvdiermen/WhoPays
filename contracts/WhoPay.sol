pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Whopay {  
  // Struct DB for each member
  struct member {
    uint memberPaid;
    uint balance;
    bool positive;
    uint totalOws;
  }

  //group parameters
  string public groupName;
  uint public totalAmount;
  uint public totalOwed;
  bool public contractClosed;

  mapping (address => member) public memberInfo;

  address[] public memberList;

  //contructor function
  function Whopay(string name, address[] memberAddresses){
    groupName = name;
    memberList = memberAddresses;
    contractClosed = false;
  }

  //adding
  function memberPay(address member, uint paid) returns(uint){
    if (contractClosed) throw;
    if(paid > 0 && validMember(member)){
      memberInfo[member].memberPaid += paid;
      totalAmount += paid;
      return memberInfo[member].memberPaid;
    }
  }
 
  //removing
  function memberReduce(address member, uint paid) returns(uint){
    if (contractClosed) throw;
    if(paid > 0 && validMember(member)){
      if((memberInfo[member].memberPaid - paid) < 0 || (totalAmount - paid) < 0) throw;
      memberInfo[member].memberPaid -= paid;
      totalAmount -= paid;
      return memberInfo[member].memberPaid;
    }
  }

  //checking if address is valid
  function validMember(address member) constant returns (bool) {
    if (contractClosed) throw;
     for(uint i = 0; i < memberList.length; i++) {
        if (memberList[i] == member) {
          return true;
        }
      }
      return false;
  }

  //status for 1 user
  function memberStatus(address member) constant returns(uint){
    if (contractClosed) throw;
    if (validMember(member)) return memberInfo[member].memberPaid;
  }

  function groupInfo() constant returns(string){
    return (groupName);
  }

  //status for all users
  function totalStatus() constant returns(uint){
    return totalAmount;
  }

  function listMembers() constant returns(address[]){
    return memberList;
  }

  function contractResolve() returns(bool){
    if (contractClosed) throw;
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
        memberInfo[memberList[i]].totalOws = userBalance;
        totalOwed += userBalance;
      }
      //set balance for each member
      memberInfo[memberList[i]].balance = userBalance;
    }
    return true;
  }

  function memberAddPay(address member) payable{
    if (contractClosed) throw;
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
    contractClosed = true;
    }
  }

  function payOut(address member) private{
    if (memberInfo[member].balance > 0){
        member.transfer(memberInfo[member].balance);
    }
  }

  function userBalance(address member) constant returns(uint, bool){
    if (contractClosed) throw;
    uint amount;
    if (memberInfo[member].positive == true){
      amount = memberInfo[member].balance;
    }else{
      amount = memberInfo[member].totalOws;
    }
    return (amount,memberInfo[member].positive);
  }
}

