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
		stage('Build nginx image') {
			steps {
				sh 'docker build -t basepage/nginx ./FE/ibg'
			}
		}
		stage('React Deploy') {
			steps{
				sh 'docker stop nginx && docker rm nginx'
				sh 'docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt -u root basepage/nginx'
			}
		}
		stage('Springboot Build') {
			steps {
				dir('./BE'){
					sh './gradlew build'
				}
			}
		}
		stage('Build Springboot image'){
			steps {
				sh 'docker build -t basepage/springboot ./BE'
			}
		}
		stage('Springboot Deploy') {
			steps {
				// sh 'docker stop springboot && docker rm springboot'
				sh 'docker run -d --name springboot -p 7777:7777 -v /etc/letsencrypt:/etc/letsencrypt -u root basepage/springboot'
				sh 'docker cp ./BE/build/lib springboot:./BE/build/lib'
			}
		}
		stage('Finish') {
			steps{
				sh 'docker restart nginx'
				sh 'docker ps -a'
				sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
			}
		}
	}
}