document.getElementById("issueInputForm").addEventListener('submit', saveIssue);

// For saving issues in the local storage
function saveIssue(e){
  // Getting the values from the form
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueId = chance.guid(); // global unique identifier
  var issueStatus = 'Open'; // Status is initially Open

  // Assign the values in an object
  var issue = {
    id : issueId,
    description : issueDesc,
    severity : issueSeverity,
    assignedTo : issueAssignedTo,
    status : issueStatus
  }

  // Add the issue to the local storage
  if(localStorage.getItem('issues') === null){
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }else{
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  // Reset the form elements
  document.getElementById("issueInputForm").reset();
  // Get the issues from issue list
  fetchIssues();
  // Prevent the form from submitting
  e.preventDefault();
}

// Method for setting issue status to Closed
function setStatusClosed(id){
  // Get the issues from local storage
  var issues = JSON.parse(localStorage.getItem('issues'));
  // Check for the issue to be closed by its id
  for(var i=0; i<issues.length; i++){
    if(issues[i].id == id){
      issues[i].status = "Closed"; // issue status set to Closed
    }
  }
  // Again set the issues to the local storage
  localStorage.setItem('issues', JSON.stringify(issues));
  // Get the issues from issue list
  fetchIssues();
}

// MEthod for deleting an Issue
function deleteIssue(id){
  // Get the issues from local storage
  var issues = JSON.parse(localStorage.getItem('issues'));
  // Check for the issue to be deleted by its id
  for(var i=0; i<issues.length; i++){
    if(issues[i].id == id){
      issues.splice(i, 1); // issue deleted from list
    }
  }
  // Again set the issues to the local storage
  localStorage.setItem('issues', JSON.stringify(issues));
  // Get the issues from issue list
  fetchIssues();
}

// For getting the saved issues
function fetchIssues(){
  // Getting the issues from the local storage
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issueList');

  issuesList.innerHTML = '';
  if(issues != null){
    // Iterate for each issue
    for(var i=0; i<issues.length; i++){
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;

      // Rendering each issue in the issue list
      issuesList.innerHTML += '<div class="well">'+
                              '<h6>Issue ID: '+id+'</h6>'+
                              '<p><span class="label label-info">'+status+'</span></p>'+
                              '<h3>'+desc+'</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span>'+severity+'</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span>'+assignedTo+'</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning btn-xs">Close</a>    '+
                              '    <a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger btn-xs">Delete</a>'+
                              '</div>'
    }
  }
}
