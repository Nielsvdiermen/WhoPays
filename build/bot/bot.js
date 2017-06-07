/*
 * GENERAL VARIABLES AND SETTINGS
 */

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
  var suggestions = localStorage.getItem(listGuid).split(',').map(function(entry) {
    if (entry) {
      var userLength = 0;

      if (localStorage.getItem(entry)) {
        var users = localStorage.getItem(entry).split(',');
        if (users) {
          userLength = users.length;
        }
      }
      return status.components.touchable(
        {onPress: status.components.dispatch([status.events.SET_COMMAND_ARGUMENT,[0, entry]])},
        status.components.view(
          suggestionsContainerStyle,
          [status.components.view(
            suggestionSubContainerStyle,
            [
              status.components.text(
                {style: valueStyle},
                entry
              ),
              status.components.text(
                {style: subValueStyle},
                userLength + " users"
              )
            ]
          )]
        )
      );
    }

    return status.components.view(
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
    );
  });

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
    name: "create",
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
          }, params.create),
        ])
      }
    },
  handler: function(params) {
    if (localStorage.getItem(listGuid)) {
      localStorage.setItem(listGuid, localStorage.getItem(listGuid) + "," + params.create);
    } else {
      localStorage.setItem(listGuid, params.create);
    }
    status.sendMessage("You've successfully created a new list: " + params.create + '.');
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
    name: "remove",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: listSuggestions
  }],
  handler: function(params) {
    var listArray = localStorage.getItem(listGuid).split(',');
    var itemIndex = listArray.indexOf(params.remove);
    if(itemIndex !== -1) {
      listArray.splice(itemIndex, 1);
    }
    status.sendMessage(localStorage.getItem(listGuid));
    status.sendMessage(itemIndex);
    // Remove the list from the listArray
    localStorage.setItem(listGuid, listArray.toString());
    // Remove the list which contains the user data
    localStorage.setItem(params.remove, null);
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
          }, "You've successfully added the user " + params.user + " to the list " + params.list),
        ])
      }
    },
  params: [{
    name: "list",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: listSuggestions
  },
  {
    name: "user",
    type: status.types.TEXT,
    placeholder: "Add user"
  }],
  handler: function(params) {
    if (localStorage.getItem(params.list)) {
      localStorage.setItem(params.list, localStorage.getItem(params.list) + "," + params.user);
    } else {
      localStorage.setItem(params.list, params.user);
    }
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
status.addListener("on-message-send", function (params, context) {
  
  var abi = [{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"userBalance","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"groupDescription","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getOwed","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"validMember","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"memberStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"groupName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"},{"name":"paid","type":"uint256"}],"name":"memberReduce","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberInfo","outputs":[{"name":"memberPaid","type":"uint256"},{"name":"balance","type":"uint256"},{"name":"positive","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"memberList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"listMembers","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"contractResolve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"groupInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"address"},{"name":"other","type":"address"}],"name":"userOws","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"},{"name":"paid","type":"uint256"}],"name":"memberPay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"memberAddresses","type":"address[]"}],"payable":false,"type":"constructor"}];
  
  var code = "0x6060604052346200000057604051620013543803806200135483398101604090815281516020830151918301519083019291820191015b8260009080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200008457805160ff1916838001178555620000b4565b82800160010185558215620000b4579182015b82811115620000b457825182559160200191906001019062000097565b5b50620000d89291505b80821115620000d45760008155600101620000be565b5090565b50508160019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200012857805160ff191683800117855562000158565b8280016001018555821562000158579182015b82811115620001585782518255916020019190600101906200013b565b5b506200017c9291505b80821115620000d45760008155600101620000be565b5090565b5050805160048054828255600082905290917f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b9182019160208501821562000206579160200282015b82811115620002065782518254600160a060020a0319166c0100000000000000000000000091820291909104178255602090920191600190910190620001c5565b5b50620002349291505b80821115620000d4578054600160a060020a031916815560010162000210565b5090565b50505b5050505b61110a806200024a6000396000f3606060405236156100c45760e060020a60003504630103c92b81146100c95780631a39d8ef146100f257806335eb9f2e146101115780634755fa781461018c57806361ce7f461461019b57806364afef30146101bf5780636eda0ab6146101e1578063783cec80146102005780637d3a9a1e1461027b578063a313c371146102a0578063b307fc6d146102d0578063b6afd2ca146102fc578063c2534e5314610353578063e4ac7cbd14610374578063e72743191461044e578063f570386414610473575b610000565b34610000576100d9600435610498565b6040805192835290151560208301528051918290030190f35b34610000576100ff6104c4565b60408051918252519081900360200190f35b346100005761011e6104ca565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561017e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3461000057610199610557565b005b34610000576101ab600435610b0f565b604080519115158252519081900360200190f35b34610000576100ff600435610b7f565b60408051918252519081900360200190f35b34610000576100ff610bb0565b60408051918252519081900360200190f35b346100005761011e610bb7565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561017e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576100ff600435602435610c45565b60408051918252519081900360200190f35b34610000576102b0600435610cc9565b604080519384526020840192909252151582820152519081900360600190f35b34610000576102e0600435610ced565b60408051600160a060020a039092168252519081900360200190f35b3461000057610309610d1d565b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f1509050019250505060405180910390f35b34610000576101ab610d88565b604080519115158252519081900360200190f35b3461000057610381610f4b565b6040518080602001806020018381038352858181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103e55780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561043e5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34610000576100ff60043560243561108a565b60408051918252519081900360200190f35b34610000576100ff6004356024356110ba565b60408051918252519081900360200190f35b600160a060020a0381166000908152600360205260409020600181015460029091015460ff165b915091565b60025481565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561054f5780601f106105245761010080835404028352916020019161054f565b820191906000526020600020905b81548152906001019060200180831161053257829003601f168201915b505050505081565b6000805b600454821015610b0a5760036000600484815481101561000057906000526020600020900160005b9054600160a060020a036101009290920a900416815260208101919091526040016000206002015460ff161515610afd575060005b600454811015610afd5760036000600483815481101561000057906000526020600020900160005b9054600160a060020a036101009290920a900416815260208101919091526040016000206002015460ff16151560011480156106665750600060036000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002060010154115b80156106bc5750600060036000600485815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002060010154115b15610af35760036000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001015460036000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002060010154111561092a5760036000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001015460036000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001016000828254039250508190555060036000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001015460036000600485815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206003016000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002081905550600060036000600485815481101561000057906000526020600020900160005b9054600160a060020a036101009290920a9004168152602081019190915260400160002060010155610af3565b60036000600483815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001015460036000600485815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001016000828254039250508190555060036000600483815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206001015460036000600485815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a031681526020019081526020016000206003016000600484815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002081905550600060036000600484815481101561000057906000526020600020900160005b9054600160a060020a036101009290920a90041681526020810191909152604001600020600101555b5b5b6001016105b8565b5b5b60019091019061055b565b5b5050565b6000805b600454811015610b745782600160a060020a0316600482815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a03161415610b6b5760019150610b79565b5b600101610b13565b600091505b50919050565b6000610b8a82610b0f565b15610baa5750600160a060020a0381166000908152600360205260409020545b5b919050565b6002545b90565b6000805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561054f5780601f106105245761010080835404028352916020019161054f565b820191906000526020600020905b81548152906001019060200180831161053257829003601f168201915b505050505081565b6000600082118015610c5b5750610c5b83610b0f565b5b15610cc257600160a060020a0383166000908152600360205260408120548390031080610c8d575060008260025403105b15610c9757610000565b50600160a060020a038216600090815260036020526040902080548290038155600280548390039055545b5b92915050565b60036020526000908152604090208054600182015460029092015490919060ff1683565b600481815481101561000057906000526020600020900160005b915054906101000a9004600160a060020a031681565b604080516020818101835260008252600480548451818402810184019095528085529293929091830182828015610d7d57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610d5f575b505050505090505b90565b60006000600060006000600480549050600254811561000057049350600092505b600454831015610f3f5760036000600485815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002060000154915083821115610e7c578382039050600160036000600486815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002060020160006101000a81548160ff021916908360f860020a908102040217905550610eec565b8184039050600060036000600486815481101561000057906000526020600020900160005b9054906101000a9004600160a060020a0316600160a060020a0316815260200190815260200160002060020160006101000a81548160ff021916908360f860020a9081020402179055505b8060036000600486815481101561000057906000526020600020900160005b9054600160a060020a036101009290920a90041681526020810191909152604001600020600101555b600190920191610da9565b600194505b5050505090565b6040805160208082018352600080835283518083018552818152815485516002600180841615610100026000190190931604601f81018690048602820186019097528681529495919492939092918491830182828015610fec5780601f10610fc157610100808354040283529160200191610fec565b820191906000526020600020905b815481529060010190602001808311610fcf57829003601f168201915b5050845460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529597508694509250840190508282801561107a5780601f1061104f5761010080835404028352916020019161107a565b820191906000526020600020905b81548152906001019060200180831161105d57829003601f168201915b50505050509050915091505b9091565b600160a060020a038083166000908152600360208181526040808420948616845293909101905220545b92915050565b60006000821180156110d057506110d083610b0f565b5b15610cc25750600160a060020a0382166000908152600360205260409020805482018155600280548301905554610cc2565b5b9291505056";

  var myContract = web3.eth.contract(abi); //het werkt tot hier dit maakt ook een mycontract var aan zonder problemen het is die mycontractreturned die faalt. nouja faalt. hij laat gewoon niks zien

  var myContractReturned = myContract.new('jahoor', 'nee',["0x64733387b5e9e98c39cd74cb32e7d3f078213799","0x9f3af92c5ba21126f360f933cd57d0218483ab33","0x0081d3999663f99b711595df636143b54d0e83a3"], {
    from: web3.eth.accounts[0],
    data: code,
    gas: '4700000'
  });
  
  console.log(myContractReturned.toString());  

  var result = {
     err: null,
     data: null,
     messages: []
  };

  try {
    result["text-message"] = "You're amazing, master!";
  } catch (e) {
    result.err = e;
  }

  return result;
});

*/



