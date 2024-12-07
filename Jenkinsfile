
pipeline {
    agent any
    tools {
        nodejs 'NodeJs' // Ensure 'NodeJs' is configured in Manage Jenkins -> Global Tool Configuration
    }
    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials' // Replace with your Jenkins credential ID for Docker Hub
        IMAGE_NAME = 'realestate1234/react-frontend' // Replace with your Docker Hub repository
    }
    stages {
        stage('Install Dependencies') { 
            steps {
                sh 'npm install' // Install Node.js dependencies
            }
        }
        stage('Build React App') {
            steps {
                sh 'npm run build' // Build the React app
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Define image tag
                    def imageTag = "${IMAGE_NAME}:latest"
                    // Build the Docker image with the proper build context (.)
                    sh "docker build -t ${imageTag} ."
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        def imageTag = "${IMAGE_NAME}:latest"
                        sh "docker push ${imageTag}" // Push the latest tag
                    }
                }
            }
        }
        /*stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kube-config', variable: 'KUBECONFIG')]) {
                        // Set KUBECONFIG environment variable
                        sh 'export KUBECONFIG=${KUBECONFIG}'
                        
                        // Apply the Kubernetes YAML file from the root directory
                        sh "kubectl apply -f react-front-depl.yml"
                        
                        // Verify the deployment rollout
                        sh "kubectl rollout status deployment/react-front-depl -n default"
                    }
                }
            }
        }*/
    }
}
