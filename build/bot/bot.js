 /*
  * 
    JSON DATA:
  *   { 
  *     lists: [
          {
            'name': 'listname', 
            'hash': 'contracthash',
            'users': [
              {
               address: 'eth_address',
              },
              {
               address: 'eth_address',
              },
            ]
          }
        ]
  *     
      }
  * 
  *
  *
  *
  */

// Contract ABI definition
var contractAbi = [{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"userBalance","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"validMember","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"memberStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"groupName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"},{"name":"paid","type":"uint256"}],"name":"memberReduce","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberInfo","outputs":[{"name":"memberPaid","type":"uint256"},{"name":"balance","type":"uint256"},{"name":"positive","type":"bool"},{"name":"totalOws","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"memberList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"listMembers","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"}],"name":"memberAddPay","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"contractResolve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"groupInfo","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalOwed","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"},{"name":"paid","type":"uint256"}],"name":"memberPay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"memberAddresses","type":"address[]"}],"payable":false,"type":"constructor"}];

// Just some random string since we need to store our lists in this variable
var listGuid = '4cc7d83b-9de8-49fe-816f-bab54f389a1a';

// General suggestions style, will also be used by other suggestions
function suggestionsContainerStyle(suggestionsCount) {
  return {
    marginVertical: 1,
    marginHorizontal: 0,
    keyboardShouldPersistTaps: "always",
    height: Math.min(150, (60 * suggestionsCount)),
    backgroundColor: "#ffffff",
    flexGrow: 1,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  };
}

var suggestionSubContainerStyle = {
  height: 60,
  borderBottomWidth: 1,
  borderBottomColor: "#eeeeee",
  justifyContent: 'center',
  paddingLeft: 10,
  paddingRight: 10,
};

var valueStyle = {
  fontWeight: 'bold',
  fontSize: 15,
  color: "#111",
};

var subValueStyle = {
  fontWeight: 'normal',
  fontSize: 15,
  color: "#555",
}

function listSuggestions() {
  var suggestions;
  if (getData().length !== 0) {
    suggestions = getData().map(function(entry) {
      return status.components.touchable(
        {onPress: status.components.dispatch([status.events.SET_COMMAND_ARGUMENT,[0, entry.name]])},
        status.components.view(
          suggestionsContainerStyle,
          [status.components.view(
            suggestionSubContainerStyle,
            [
              status.components.text(
                {style: valueStyle},
                entry.name
              ),
              status.components.text(
                {style: subValueStyle},
                entry.users.length + " users"
              )
            ]
          )]
        )
      );
    });
  } else {
    suggestions = [status.components.view(
      { style: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 200}},
      [status.components.view(
        {}, [
          status.components.image(
            {
                source: {uri: "https://ethdeveloper.com/static/whopays-no-lists.png"},
                style: {
                    width: 100,
                    height: 100,
                    marginBottom: 20,
                }
            }
          ),
          status.components.text(
                {style: { color: '#111', fontSize: 16 }},
                "No lists found"
              ),
        ]
      )]
    )];
  }

  // Let's wrap those two touchable buttons in a scrollView
  var view = status.components.scrollView(
      suggestionsContainerStyle(localStorage.getItem(listGuid).split(',').length),
      suggestions
  );

  // Give back the whole thing inside an object.
  return { markup: view };
}
  

/*
 * GET-STARTED
 */


function getStartedScrollView() {
  return {
      horizontal: true,
      pagingEnabled: true,
      backgroundColor: "#02b7cc",
      flexDirection: 'row',
  };
}

var styles = {
  step: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 450,
    flex: 1,
    marginBottom: 100,
    width: 360,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 100
  },
  title: {
    color: "#fff",
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 5,
  },
  desc: {
    color: "rgba(255,255,255, 0.8)",
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21
  },
}

function showGetStarted(params, context) {

  var steps = [
    {
      title: "Welcome to WhoPays",
      desc: "Someone from your group creates a list and invites the other users",
      image: "https://status.im/img/crowdsale/phone@2x.png",
      image_width: 240,
      image_height: 200,
    },
    {
      title: "Create a list",
      desc: "Someone from your group creates a list and invites the other users",
      image: "https://ethdeveloper.com/static/get-started-1.png",
      image_width: 128,
      image_height: 128,
    },
    {
      title: "Add expenses",
      desc: "Everyone from the group can add their expenses to the list",
      image: "https://ethdeveloper.com/static/get-started-2.png",
      image_width: 128,
      image_height: 128,
    },
    {
      title: "Close the list",
      desc: "At the end of the week the person who created the list can close the list. Everyone gets notified if they have to pay and how much.",
      image: "https://ethdeveloper.com/static/get-started-3.png",
      image_width: 128,
      image_height: 128,
    },
    {
      title: "Transfer Ether",
      desc: "Every person who needs to pay, transfers Ether to the list. The list keeps track of who paid.",
      image: "https://ethdeveloper.com/static/get-started-4.png",
      image_width: 128,
      image_height: 128,
    },
    {
      title: "Done!",
      desc: "Once everyone paid. The list will transfer Ether automatically to the persons who are still owed Ether. The list will be resolved.",
      image: "https://ethdeveloper.com/static/get-started-5.png",
      image_width: 128,
      image_height: 128,
    }
  ];

  var screens = steps.map(function (step) {
      return status.components.view(
        styles.step,
        [
          status.components.image(
            {
                source: {uri: step.image},
                style: {
                    width: step.image_width,
                    height: step.image_height,
                    marginBottom: 20,
                }
            }
          ),
          status.components.text(
            { style: styles.title },
            step.title
          ),
          status.components.text(
            { style: styles.desc },
            step.desc
          )
        ]
      );
  });

  var view = status.components.scrollView(
    getStartedScrollView(),
    screens
  );

  return {
    title: "Get started",
    dynamicTitle: false,
    singleLineInput: true,
    markup: view
  };
}

status.command({
  name: "get-started",
  title: "get-started",
  registeredOnly: true,
  description: "Shows a short intro describing WhoPays",
  color: "#2bd18e",
  fullscreen: true,
  onSend: showGetStarted
});

/*
 * CREATE LIST
 */

var create = {
  name: "create",
  title: "Create list",
  icon: "list",
  registeredOnly: true,
  description: "Create a list",
  color: "#2bd18e",
  params: [{
    name: "name",
    type: status.types.TEXT,
    placeholder: "Add your list name"
  }],
  preview: function (params) {
    return {
        markup: status.components.view({}, [
          status.components.text({
            style: {
              marginTop: 5,
              fontSize: 15,
              color: "#111111",
            }
          }, "Create a list named "),
          status.components.text({
            style: {
              marginTop: 2,
              fontSize: 15,
              color: "#111111",
              fontWeight: 'bold',
            }
          }, params.name),
        ])
      }
    },
  handler: function(params) {
    createList(params.name);
  }
}

status.command(create);

/*
 * REMOVE LIST
 */

status.command({
  name: "remove",
  title: "Remove a list",
  registeredOnly: true,
  description: "Remove a list",
  color: "#2bd18e",
  params: [{
    name: "name",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: listSuggestions
  }],
  handler: function(params) {
    removeList(params.name);
  }
});

/*
 * ADD USER
 */

status.command({
  name: "add-user",
  title: "Add user",
  registeredOnly: true,
  description: "Add a user to a list",
  color: "#2bd18e",
  sequentialParams: true,
  preview: function (params) {
    return {
        markup: status.components.view({}, [
          status.components.text({
            style: {
              marginTop: 5,
              marginHorizontal: 0,
              fontSize: 14,
              color: "#111111"
            }
          }, "Adding user with the following Ether address: " + params.address + "."),
        ])
      }
    },
  params: [{
    name: "name",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: listSuggestions
  },
  {
    name: "address",
    type: status.types.TEXT,
    placeholder: "User Ether Address"
  }],
  handler: function(params) {
    addUserToList(params.name, params.address);
  }
});

/*
 * VIEW LIST
 */

function showViewList(params, context) {

  var users = localStorage.getItem(params.list).split(',');
  var userText = users.map(function(user) {
    return status.components.view(
      {},
      [
        status.components.text(
            {},
            user
          )
      ]
    )
  });

  var screen = [status.components.view(
    {},
    userText
  )];

  var view = status.components.scrollView(
    ViewListScrollView(),
    screen
  );

  return {
    title: "View list",
    dynamicTitle: false,
    singleLineInput: true,
    markup: view
  };
}

status.command({
  name: "view",
  title: "view",
  registeredOnly: true,
  description: "View a list with its members",
  color: "#2bd18e",
  fullscreen: true,
  onSend: showViewList,
  params: [{
    name: "list",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: listSuggestions
  }],
});


function ViewListScrollView() {
  return {
    horizontal: true,
    pagingEnabled: true,
    backgroundColor: "#02b7cc",
    flexDirection: 'row',
  };
}

/*
 * ACTIVATE
 */

status.command({
  name: "activate",
  title: "activate",
  registeredOnly: true,
  description: "Activate a list",
  color: "#2bd18e",
  params: [{
    name: "name",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: listSuggestions
  }],
  handler: function(params) {  
    var code = "606060405234156200000d57fe5b604051620015b0380380620015b0833981016040528080518201919060200180518201919050505b81600090805190602001906200004d9291906200008b565b5080600590805190602001906200006692919062000112565b506000600360006101000a81548160ff0219169083151502179055505b50506200020f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620000ce57805160ff1916838001178555620000ff565b82800160010185558215620000ff579182015b82811115620000fe578251825591602001919060010190620000e1565b5b5090506200010e9190620001a1565b5090565b8280548282559060005260206000209081019282156200018e579160200282015b828111156200018d5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019062000133565b5b5090506200019d9190620001c9565b5090565b620001c691905b80821115620001c2576000816000905550600101620001a8565b5090565b90565b6200020c91905b808211156200020857600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550600101620001d0565b5090565b90565b611391806200021f6000396000f300606060405236156100e4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630103c92b146100e65780631a39d8ef1461013b57806361ce7f461461016157806364afef30146101af5780636eda0ab6146101f9578063783cec801461021f5780637d3a9a1e146102b8578063a313c3711461030b578063b307fc6d1461036e578063b6afd2ca146103ce578063bed474a214610443578063c2534e5314610471578063e4ac7cbd1461049b578063e7fa9f7d14610534578063f57038641461055a578063f5e1a452146105ad575bfe5b34156100ee57fe5b61011a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105d7565b60405180838152602001821515151581526020019250505060405180910390f35b341561014357fe5b61014b610740565b6040518082815260200191505060405180910390f35b341561016957fe5b610195600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610746565b604051808215151515815260200191505060405180910390f35b34156101b757fe5b6101e3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610808565b6040518082815260200191505060405180910390f35b341561020157fe5b610209610883565b6040518082815260200191505060405180910390f35b341561022757fe5b61022f61088e565b604051808060200182810382528381815181526020019150805190602001908083836000831461027e575b80518252602083111561027e5760208201915060208101905060208303925061025a565b505050905090810190601f1680156102aa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102c057fe5b6102f5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061092c565b6040518082815260200191505060405180910390f35b341561031357fe5b61033f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a76565b604051808581526020018481526020018315151515815260200182815260200194505050505060405180910390f35b341561037657fe5b61038c6004808035906020019091905050610ab3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103d657fe5b6103de610af3565b6040518080602001828103825283818151815260200191508051906020019060200280838360008314610430575b8051825260208311156104305760208201915060208101905060208303925061040c565b5050509050019250505060405180910390f35b61046f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b88565b005b341561047957fe5b610481610d83565b604051808215151515815260200191505060405180910390f35b34156104a357fe5b6104ab6110c1565b60405180806020018281038252838181518152602001915080519060200190808383600083146104fa575b8051825260208311156104fa576020820191506020810190506020830392506104d6565b505050905090810190601f1680156105265780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561053c57fe5b61054461116a565b6040518082815260200191505060405180910390f35b341561056257fe5b610597600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611170565b6040518082815260200191505060405180910390f35b34156105b557fe5b6105bd611258565b604051808215151515815260200191505060405180910390f35b600060006000600360009054906101000a900460ff16156105f85760006000fd5b60011515600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff161515141561069e57600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015490506106e4565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003015490505b80600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16925092505b50915091565b60015481565b60006000600360009054906101000a900460ff16156107655760006000fd5b600090505b6005805490508110156107fd578273ffffffffffffffffffffffffffffffffffffffff1660058281548110151561079d57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156107ef5760019150610802565b5b808060010191505061076a565b600091505b50919050565b6000600360009054906101000a900460ff16156108255760006000fd5b61082e82610746565b1561087d57600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154905061087e565b5b919050565b600060015490505b90565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109245780601f106108f957610100808354040283529160200191610924565b820191906000526020600020905b81548152906001019060200180831161090757829003601f168201915b505050505081565b6000600360009054906101000a900460ff16156109495760006000fd5b60008211801561095e575061095d83610746565b5b15610a6f57600082600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001540310806109ba575060008260015403105b156109c55760006000fd5b81600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254039250508190555081600160008282540392505081905550600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050610a70565b5b92915050565b60046020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16908060030154905084565b600581815481101515610ac257fe5b906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610afb61133d565b6005805480602002602001604051908101604052809291908181526020018280548015610b7d57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610b33575b505050505090505b90565b60006000600360009054906101000a900460ff1615610ba75760006000fd5b349150600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030154821115610bfa5760006000fd5b81600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301600082825403925050819055508160026000828254039250508190555060006002541415610d7d57600090505b600580549050811015610d61576001151560046000600584815481101515610c8e57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1615151415610d5357610d52600582815481101515610d2057fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661126b565b5b5b8080600101915050610c6a565b6001600360006101000a81548160ff0219169083151502179055505b5b505050565b60006000600060006000600360009054906101000a900460ff1615610da85760006000fd5b600580549050600154811515610dba57fe5b049350600092505b6005805490508310156110b55760046000600585815481101515610de257fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154915083821115610ef7578382039050600160046000600586815481101515610e7157fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff021916908315150217905550611025565b8184039050600060046000600586815481101515610f1157fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff0219169083151502179055508060046000600586815481101515610fa657fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030181905550806002600082825401925050819055505b806004600060058681548110151561103957fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505b8280600101935050610dc2565b600194505b5050505090565b6110c9611351565b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561115f5780601f106111345761010080835404028352916020019161115f565b820191906000526020600020905b81548152906001019060200180831161114257829003601f168201915b505050505090505b90565b60025481565b6000600360009054906101000a900460ff161561118d5760006000fd5b6000821180156111a257506111a183610746565b5b156112515781600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254019250508190555081600160008282540192505081905550600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050611252565b5b92915050565b600360009054906101000a900460ff1681565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541115611339578073ffffffffffffffffffffffffffffffffffffffff166108fc600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549081150290604051809050600060405180830381858888f19350505050151561133857fe5b5b5b50565b602060405190810160405280600081525090565b6020604051908101604052806000815250905600a165627a7a723058205c52cbdb8aeb0c379e4e774e0bbda264c859f4cf166565c2547421c558e69fe10029";

    var myContract = web3.eth.contract(contractAbi);

    var list = getList(params.name);

    var myContractInstance = myContract.new(params.list, 'desc', list.users, {
      from: web3.eth.accounts[0],
      data: code,
      gas: '4700000'
    });

    status.sendMessage("Creating the list. This might take some time..");
    var hash = waitForContractHash(myContractInstance.transactionHash);
    status.sendMessage("List created. Copy the address below to the friends you added to this list.");
    status.sendMessage(hash.contractAddress);
  }
});


status.command({
  name: "data",
  title: "data",
  registeredOnly: true,
  description: "Get sample data",
  color: "#2bd18e",
  handler: function(params) { 
    status.sendMessage(localStorage.getItem("data"));
  }
});

function createList(name) {
  var list = { name: name, users: [], hash: null };
  if (localStorage.getItem("data")) {
    var data = JSON.parse(localStorage.getItem("data"));
    data.push(list);
    setData(data);
  } else {
    setData([list]);
  }
  status.sendMessage("You've successfully created a new list: " + name + '.');
}

function addUserToList(name, address) {
  var data = getData();
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      data[i].users.push({ address: address });
    }
  }
  setData(data);
}

function getList(name) {
  var data = getData();
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      return data[i];
    }
  }
}

function removeList(name) {
  var data = getData();
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      data.splice(i, 1);
    }
  }
  setData(data);
}

function setData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem("data"));
}

/*
 * Thanks to @tomnash who linked me to their project to help me figure out how they wait for their contractHash
 * https://github.com/morelazers/SaveWithStatus/blob/master/build/bot/bot.js
 */ 
function waitForContractHash(txHash) {
  var mined = false
  var receipt
  while (!mined) {
    receipt = web3.eth.getTransactionReceipt(txHash)
    if (!receipt) continue
    if (receipt.contractAddress || receipt.gasUsed) mined = true
  }
  return receipt
}

