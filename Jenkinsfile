node {
  stage('========== Clone repository ==========') {
    checkout scm
  }
  stage('========== Build image ==========') {
    container('dind') {
      sh "docker build -t jenkins-docker-pipeline/woodoku ." 
    }
  }
  stage('========== Push image ==========') {
    env.REGISTRY_HOST = ""
    
    withCredentials([file(credentialsId: 'gcp-artifact-registry-jibaek-woodoku', variable: 'GCP_SA_KEY_FILE')]) {
        container('dind') {
            sh """
            cat "${GCP_SA_KEY_FILE}" | docker login -u _json_key --password-stdin asia-northeast3-docker.pkg.dev

            docker tag jenkins-docker-pipeline/woodoku "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:${env.BUILD_NUMBER}"
            docker tag jenkins-docker-pipeline/woodoku "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:latest"

            docker push "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:${env.BUILD_NUMBER}"
            docker push "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:latest"
            """
        }
    }
  }
}

