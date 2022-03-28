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
				sh 'docker stop nginx && docker rm nginx'
				sh 'docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt/archive:/etc/letsencrypt/archive -u root basepage/nginx'
				sh 'docker ps -a'
			}
		}
		stage('Finish') {
			steps{
				sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
			}
		}
	}
}