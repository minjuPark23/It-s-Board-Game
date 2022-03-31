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
				sh 'docker run --network backend -d --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt -u root basepage/nginx'
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
				sh 'docker stop springboot && docker rm springboot'
				sh 'docker run --network backend -d --name springboot -p 7777:7777 -v /etc/letsencrypt:/etc/letsencrypt -u root basepage/springboot'
			}
		}
		stage('Django Build'){
			steps {
				dir('./django/ibg') {
					sh 'docker build -t basepage/django .'
				}
			}
		}
		stage('Django Deploy') {
			steps {
				// sh 'docker stop django && docker rm django'
				sh 'docker run --network backend -d --name django -p 7776:7776 -v /etc/letsencrypt:/etc/letsencrypt -u root basepage/django'
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