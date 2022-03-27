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
				sh 'cd ./FE/ibg'
				sh 'npm install'
			}
		}
		stage('React Build') {
			steps {
				sh 'npm run build'
			}
		}
		stage('Build') {
			steps {
				sh 'docker build -t basepage/nginx ./FE/ibg'
			}
		}
		stage('Deploy') {
			steps{
				sh 'docker ps -q --filter name=nginx | grep -q . && docker stop nginx && docker rm nginx'
				sh 'docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt/archive:/etc/letsencrypt/archive -u root basepage/nginx'
			}
		}
		stage('Finish') {
			steps{
				sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
			}
		}
	}
}