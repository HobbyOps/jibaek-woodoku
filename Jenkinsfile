node {
  stage('========== Clone repository ==========') {
    checkout scm
  }
  stage('========== Build image ==========') {
    container('dind') {
      sh "docker build -t jenkins-docker-pipeline/woodoku ." // 여기에 "sh "가 한 번 더 있었어요. 제거했습니다.
    }
  }
  stage('========== Push image ==========') {
    container('dind') {
      sh """
        gcloud auth configure-docker ${env.GAR_LOCATION}-docker.pkg.dev
        docker push jenkins-docker-pipeline/woodoku:${env.BUILD_NUMBER}
        docker push jenkins-docker-pipeline/woodoku:latest
      """
    }
  }
}

