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
  color: "#02ccba",
  fullscreen: true,
  onSend: showGetStarted
});


/*
 * CREATE
 */

function createScrollView() {
  return {
      horizontal: true,
      pagingEnabled: true,
      backgroundColor: "#02b7cc",
      flexDirection: 'row',
  };
}


var createStyles = {
  buttonContainer: { 
    marginTop: 10,
    flexDirection: 'row', 
    'alignItems': 'flex-start' 
  },
  addButton: {
    backgroundColor: '#02ccba',
    height: 30,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    marginRight: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#02b3e4',
    height: 30,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
}

function showCreate() {

  var view = status.components.scrollView(
    createScrollView(),
    [status.components.view({},[
      status.components.view({},[
        status.components.text({
          style: {
            marginTop: 5,
            marginHorizontal: 0,
            fontSize: 14,
            color: "#111111"
          }
        }, "test"),
        status.components.text({
          style: {
            marginTop: 5,
            marginHorizontal: 0,
            fontSize: 14,
            color: "#111111"
          }
        }, web3.eth.accounts[0]),
        status.components.touchable(
          { onPress: status.components.dispatch([status.events.SET_VALUE, "/add-to-list address"]) },
          status.components.view(
              { style: createStyles.addButton },
              [status.components.view(
                  {},
                  [
                      status.components.text(
                          { style: createStyles.addButtonText },
                          "Add address"
                      )
                  ]
              )]
          )),
      ])
    ])]
  );


  return {
    title: "Create a list",
    dynamicTitle: false,
    singleLineInput: true,
    markup: view
  };
}

status.command({
  name: "create",
  title: "create",
  registeredOnly: true,
  description: "Create a list",
  color: "#02ccba",
  fullscreen: true,
  onSend: showCreate,
});

  /*
    // Empty the users list, since we're creating a new one
    web3.db.putString("users", "users", "");
    showCreate();
  }
*/
status.command({
  name: "add-to-list",
  title: "add-to-list",
  registeredOnly: true,
  description: "Add a user to a list",
  color: "#02ccba",
  params: [{
    name: "add-to-list",
    type: status.types.TEXT,
    placeholder: "Add ether address of user"
  }],
  /*
  onSend: function() {
    web3.db.putString("users", "users", web3.db.getString("users", "users") + "test");
  }
  */
});


/*
var create = {
  name: "create",
  title: "List created",
  icon: "smile",
  registeredOnly: true,
  description: "Create a list",
  color: "#02ccba",
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
              marginHorizontal: 0,
              fontSize: 14,
              color: "#111111"
            }
          }, "You've successfully created a list named"),
          status.components.text({
            style: {
              marginHorizontal: 0,
              fontSize: 14,
              fontWeight: 'bold',
              color: "#111111",
            }
          }, params.create + "."),
          status.components.view({ style: createStyles.buttonContainer }, [
            status.components.touchable(
                { onPress: status.components.dispatch([status.events.SET_VALUE, 'something'])},
                status.components.view(
                    { style: createStyles.addButton },
                    [status.components.view(
                        {},
                        [
                            status.components.text(
                                { style: createStyles.addButtonText },
                                "Add person"
                            )
                        ]
                    )]
                )),
            status.components.touchable(
              { onPress: status.components.dispatch([status.events.SET_VALUE, 'something'])},
              status.components.view(
                  { style: createStyles.doneButton },
                  [status.components.view(
                      {},
                      [
                          status.components.text(
                              { style: createStyles.doneButtonText },
                              "Start tracking"
                          )
                      ]
                  )]
              ))
            ])
          ]),
          
    };
  },
}
*/


// status.response(create);

// /create "List name"
// List created, this is the actionable message (Click here to add users)

// give name
// add users
// Create
// Make contract

