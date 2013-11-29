(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "facebook\n========\n\nFacebook API integration for distri apps.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Facebook\n========\n\n    module.exports =\n      init: (appId, options={}, callback) ->\n        options.status ?= true\n        options.xfbml ?= true\n        options.appId = appId\n\n        window.fbAsyncInit = ->\n          # init the FB JS SDK\n          FB.init options\n\n          # Additional initialization code such as adding Event Listeners goes here\n          callback?(FB)\n\n        # Attach the fb-root element to the body\n        fbRoot = document.createElement \"div\"\n        fbRoot.id = \"fb-root\"\n        document.body.appendChild(fbRoot)\n\n        # Load the SDK asynchronously\n        do (d=document, s='script', id='facebook-jssdk', js=undefined) ->\n           fjs = d.getElementsByTagName(s)[0]\n           return if d.getElementById(id)\n           js = d.createElement(s)\n           js.id = id\n           js.src = \"//connect.facebook.net/en_US/all.js\"\n           fjs.parentNode.insertBefore(js, fjs)\n\nTODO: Test this out\n\nPass an array of scope permissions and a function to call once those permissions\nhave been granted.\n\n      requiringPermissions: (scopes, fn) ->\n        wrapped = (fn) ->\n          ({authResponse}) ->\n            fn(authResponse)\n\n        FB.getLoginStatus ({status, authResponse}) ->\n          if status is 'connected'\n            FB.api '/me/permissions', ({data:[permissions]}) ->\n\n              permissionsToPrompt = scopes.filter (permission) ->\n                !permissions[permission]\n\n              if permissionsToPrompt.length\n                FB.login wrapped(fn),\n                  scope: permissionsToPrompt.join(',')\n              else\n                fn(authResponse)\n          else if status is 'not_authorized'\n            FB.login wrapped(fn),\n              scope: scope\n          else\n            FB.login wrapped(fn),\n              scope: scope\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.1\"\n",
      "type": "blob"
    },
    "test/test.coffee": {
      "path": "test/test.coffee",
      "mode": "100644",
      "content": "Facebook = require \"../main\"\n\nmakeLoginButton = ->\n  login = document.createElement \"fb:login-button\"\n  login.setAttribute \"show-faces\", \"true\"\n  login.setAttribute \"width\", \"200\"\n  login.setAttribute \"max-rows\", \"1\"\n\n  return login\n\n# Note, any xfbml inserted before we call the API is parsed, if any is inserted\n# later we'll need to call `FB.XFBML.parse()`\n# https://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse/\ndocument.body.insertBefore(makeLoginButton())\n\nFacebook.init \"7570224823\", null, (FB) ->\n  Facebook.requiringPermissions [\"email\", \"user_photos\"], ->\n    console.log arguments\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  module.exports = {\n    init: function(appId, options, callback) {\n      var fbRoot;\n      if (options == null) {\n        options = {};\n      }\n      if (options.status == null) {\n        options.status = true;\n      }\n      if (options.xfbml == null) {\n        options.xfbml = true;\n      }\n      options.appId = appId;\n      window.fbAsyncInit = function() {\n        FB.init(options);\n        return typeof callback === \"function\" ? callback(FB) : void 0;\n      };\n      fbRoot = document.createElement(\"div\");\n      fbRoot.id = \"fb-root\";\n      document.body.appendChild(fbRoot);\n      return (function(d, s, id, js) {\n        var fjs;\n        fjs = d.getElementsByTagName(s)[0];\n        if (d.getElementById(id)) {\n          return;\n        }\n        js = d.createElement(s);\n        js.id = id;\n        js.src = \"//connect.facebook.net/en_US/all.js\";\n        return fjs.parentNode.insertBefore(js, fjs);\n      })(document, 'script', 'facebook-jssdk', void 0);\n    },\n    requiringPermissions: function(scopes, fn) {\n      var wrapped;\n      wrapped = function(fn) {\n        return function(_arg) {\n          var authResponse;\n          authResponse = _arg.authResponse;\n          return fn(authResponse);\n        };\n      };\n      return FB.getLoginStatus(function(_arg) {\n        var authResponse, status;\n        status = _arg.status, authResponse = _arg.authResponse;\n        if (status === 'connected') {\n          return FB.api('/me/permissions', function(_arg1) {\n            var permissions, permissionsToPrompt;\n            permissions = _arg1.data[0];\n            permissionsToPrompt = scopes.filter(function(permission) {\n              return !permissions[permission];\n            });\n            if (permissionsToPrompt.length) {\n              return FB.login(wrapped(fn), {\n                scope: permissionsToPrompt.join(',')\n              });\n            } else {\n              return fn(authResponse);\n            }\n          });\n        } else if (status === 'not_authorized') {\n          return FB.login(wrapped(fn), {\n            scope: scope\n          });\n        } else {\n          return FB.login(wrapped(fn), {\n            scope: scope\n          });\n        }\n      });\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.1\"};",
      "type": "blob"
    },
    "test/test": {
      "path": "test/test",
      "content": "(function() {\n  var Facebook, makeLoginButton;\n\n  Facebook = require(\"../main\");\n\n  makeLoginButton = function() {\n    var login;\n    login = document.createElement(\"fb:login-button\");\n    login.setAttribute(\"show-faces\", \"true\");\n    login.setAttribute(\"width\", \"200\");\n    login.setAttribute(\"max-rows\", \"1\");\n    return login;\n  };\n\n  document.body.insertBefore(makeLoginButton());\n\n  Facebook.init(\"7570224823\", null, function(FB) {\n    return Facebook.requiringPermissions([\"email\", \"user_photos\"], function() {\n      return console.log(arguments);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/test.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.1",
  "entryPoint": "main",
  "repository": {
    "id": 14601350,
    "name": "facebook",
    "full_name": "distri/facebook",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/facebook",
    "description": "Facebook API integration for distri apps.",
    "fork": false,
    "url": "https://api.github.com/repos/distri/facebook",
    "forks_url": "https://api.github.com/repos/distri/facebook/forks",
    "keys_url": "https://api.github.com/repos/distri/facebook/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/facebook/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/facebook/teams",
    "hooks_url": "https://api.github.com/repos/distri/facebook/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/facebook/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/facebook/events",
    "assignees_url": "https://api.github.com/repos/distri/facebook/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/facebook/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/facebook/tags",
    "blobs_url": "https://api.github.com/repos/distri/facebook/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/facebook/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/facebook/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/facebook/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/facebook/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/facebook/languages",
    "stargazers_url": "https://api.github.com/repos/distri/facebook/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/facebook/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/facebook/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/facebook/subscription",
    "commits_url": "https://api.github.com/repos/distri/facebook/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/facebook/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/facebook/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/facebook/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/facebook/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/facebook/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/facebook/merges",
    "archive_url": "https://api.github.com/repos/distri/facebook/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/facebook/downloads",
    "issues_url": "https://api.github.com/repos/distri/facebook/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/facebook/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/facebook/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/facebook/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/facebook/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/facebook/releases{/id}",
    "created_at": "2013-11-21T22:02:00Z",
    "updated_at": "2013-11-24T03:57:53Z",
    "pushed_at": "2013-11-24T03:57:53Z",
    "git_url": "git://github.com/distri/facebook.git",
    "ssh_url": "git@github.com:distri/facebook.git",
    "clone_url": "https://github.com/distri/facebook.git",
    "svn_url": "https://github.com/distri/facebook",
    "homepage": null,
    "size": 896,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "CoffeeScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "v0.1.1",
    "defaultBranch": "master"
  },
  "dependencies": {}
});