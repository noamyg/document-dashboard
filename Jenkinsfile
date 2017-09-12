node("master"){  

    def image
    def scmVars
    def tag = "ubiimage" //env.REPOSITORY_NAME
   
    currentBuild.result = "SUCCESS"

    try {

        stage ('Checkout'){
			scmVars = checkout scm		
		}
        
		stage ('Docker Build'){
			image = docker.build tag
        }

        stage ('Test image'){
			// run some tests on it (see below), then if everything looks good:
        }

        stage ('Docker Push'){
				
			repoTag = scmVars.GIT_BRANCH.split('origin/')[1].replaceAll("/","-") + "." + scmVars.GIT_COMMIT[0..6]
			credentials = 'ecr:' + env.REPOSITORY_REGION + ':' + env.AWS_CREDENTIALS_ID
			repository_url = 'https://' + env.REPOSITORY_URI

			docker.withRegistry(repository_url, credentials) {
					image.push('latest')
			}
			docker.withRegistry(repository_url, credentials) {
					image.push(repoTag)
			}
        } 
        
		stage('Deploy'){
           
			sh 'chmod u+x ./ecs-deploy'

			//sh './ecs-deploy -r us-east-1 -c ecs-cluster-staging -n ros-service -i 574430013329.dkr.ecr.us-east-1.amazonaws.com/ros -m 0 -M 100 -D 1'
			 sh './ecs-deploy' + \
					' -r ' + env.REPOSITORY_REGION + \
					' -c ' + env.CLUSTER  + \
					' -n ' + env.SERVICE_NAME + \
					' -i ' + env.REPOSITORY_URI + '/' + env.REPOSITORY_NAME + \
					' -m ' + env.MIN_HEALTY_PERCENT + \
					' -M ' + env.MAX_HEALTY_PERCENT + \
					' -D ' + env.NO_OF_TASKS
		}
	          
        stage ('Cleanup'){
				
        }
            
    }
    catch (err) {

        currentBuild.result = "FAILURE"
        
        throw err
    }
}
