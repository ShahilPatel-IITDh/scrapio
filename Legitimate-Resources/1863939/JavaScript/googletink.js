function googletink(){
		window.open('https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
 include_granted_scopes=true&
 response_type=token&
 state=state_parameter_passthrough_value&
 redirect_uri=https%3A//oauth2..googleapis.com/token/code&
 client_id=999263012872-ikani26agf9kketjl1v0v0626ugmv4o1.apps.googleusercontent.com','500x549','toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,width=990,height=600')
		}
$(document).ready(function(){
     _calling_ googletink()
});