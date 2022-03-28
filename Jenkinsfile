pipeline {
	agent any

	tools {
		nodejs "nodejs-ibg"
	}
	
	stages {
		stage('test') {
			steps {
				echo 'Hello...'
			}
		}
		stage('React install') {
			steps {
				sh 'ls'
				sh 'npm install ./FE/ibg -g'
			}
		}
		stage('React Build') {
			steps {
				sh 'npm run build --prefix FE/ibg'
			}
		}
		stage('Build') {
			steps {
				sh 'docker build -t basepage/nginx ./FE/ibg'
			}
		}
		stage('Deploy') {
			steps{
				sh 'sudo docker ps -q --filter name=nginx | grep -q . && sudo docker stop nginx && sudo docker rm nginx'
				sh 'sudo docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt/archive:/etc/letsencrypt/archive -u root basepage/nginx'
			}
		}
		stage('Finish') {
			steps{
				sh 'sudo docker images -qf dangling=true | xargs -I{} docker rmi {}'
			}
		}
	}
}