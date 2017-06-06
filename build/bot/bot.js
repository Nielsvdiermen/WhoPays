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
 * CREATE LIST
 */

var create = {
  name: "create",
  title: "Create list",
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
        ])
      }
    },
  handler: function(params) {
    if (localStorage.getItem("list")) {
      localStorage.setItem("list", localStorage.getItem("list") + "," + params.create);
    } else {
      localStorage.setItem("list", params.create);
    }
  }
}

status.command(create);

/*
 * REMOVE LIST
 */

// General suggestions style, will also be used by other suggestions
function suggestionsContainerStyle(suggestionsCount) {
  return {
      marginVertical: 1,
      marginHorizontal: 0,
      keyboardShouldPersistTaps: "always",
      height: Math.min(150, (56 * suggestionsCount)),
      backgroundColor: "white",
      borderRadius: 5,
      flexGrow: 1
  };
}

var suggestionSubContainerStyle = {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#0000001f"
};

var valueStyle = {
    marginTop: 9,
    fontSize: 14,
    fontFamily: "font",
    color: "#000000de"
};

function removeListSuggestions() {
    var lists = localStorage.getItem("list").split(',');
    var suggestions = lists.map(function(entry) {
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
                        )
                    ]
                )]
            )
        );
    });

    // Let's wrap those two touchable buttons in a scrollView
    var view = status.components.scrollView(
        suggestionsContainerStyle(lists.length),
        suggestions
    );

    // Give back the whole thing inside an object.
    return {markup: view};
}

status.command({
  name: "remove",
  title: "Remove a list",
  registeredOnly: true,
  description: "Remove a list",
  color: "#02ccba",
  params: [{
    name: "remove",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: removeListSuggestions
  }],
  handler: function(params) {
    var listArray = localStorage.getItem("list").split(',');
    var itemIndex = listArray.indexOf(params.remove);
    if(itemIndex !== -1) {
      listArray.splice(itemIndex, 1);
    }
    // Remove the list from the listArray
    localStorage.setItem("list",  listArray.toString());
    // Remove the list which contains the user data
    localStorage.setItem(params.remove, null);
  }
});

/*
 * ADD USER
 */

function addUserSuggestions() {
    var lists = localStorage.getItem("list").split(',');
    var suggestions = lists.map(function(entry) {
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
                        )
                    ]
                )]
            )
        );
    });

    // Let's wrap those two touchable buttons in a scrollView
    var view = status.components.scrollView(
        suggestionsContainerStyle(lists.length),
        suggestions
    );

    // Give back the whole thing inside an object.
    return {markup: view};
}


status.command({
  name: "add-user",
  title: "Add user",
  registeredOnly: true,
  description: "Add a user to a list",
  color: "#02ccba",
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
    suggestions: addUserSuggestions
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


function viewListSuggestions() {
    var lists = localStorage.getItem("list").split(',');
    var suggestions = lists.map(function(entry) {
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
                        )
                    ]
                )]
            )
        );
    });

    // Let's wrap those two touchable buttons in a scrollView
    var view = status.components.scrollView(
        suggestionsContainerStyle(lists.length),
        suggestions
    );

    // Give back the whole thing inside an object.
    return {markup: view};
}

function ViewListScrollView() {
  return {
      horizontal: true,
      pagingEnabled: true,
      backgroundColor: "#02b7cc",
      flexDirection: 'row',
  };
}

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
  color: "#02ccba",
  fullscreen: true,
  onSend: showViewList,
  params: [{
    name: "list",
    type: status.types.TEXT,
    placeholder: "Select list",
    suggestions: viewListSuggestions
  }],
});


status.addListener("on-message-send", function (params, context) {
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

    console.log('our console logger');
    return result;
 });
