pipeline {
	agent any

	tools {
		nodejs "nodejs-blog"
	}
	
	stages {
		stage('test') {
			steps {
				echo 'Hello...'
			}
		}
		stage('React Build') {
			steps {
				sh 'npm install -g yarn'
				sh 'yarn --cwd ./FE install --network-timeout 100000'
				sh 'yarn --cwd ./FE build'
			}
		}
		stage('Build') {
			steps {
				sh 'docker build -t basepage/nginx ./FE/'
			}
		}
		tage('Deploy') {
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