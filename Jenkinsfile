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
    def registryHost = "asia-northeast3-docker.pkg.dev" // Groovy 변수명은 camelCase 권장
    
    withCredentials([file(credentialsId: 'gcp-artifact-registry-jibaek-woodoku', variable: 'GCP_SA_KEY_FILE')]) {
        container('dind') {
            sh """
            CURRENT_REGISTRY_HOST="${registryHost}" 

            cat "${GCP_SA_KEY_FILE}" | docker login -u _json_key --password-stdin ${CURRENT_REGISTRY_HOST}

            docker tag jenkins-docker-pipeline/woodoku "${CURRENT_REGISTRY_HOST}/astute-curve-461807-v0/jibaek-woodoku/woodoku:${env.BUILD_NUMBER}"
            docker tag jenkins-docker-pipeline/woodoku "${CURRENT_REGISTRY_HOST}/astute-curve-461807-v0/jibaek-woodoku/woodoku:latest"

            docker push "${CURRENT_REGISTRY_HOST}/astute-curve-461807-v0/jibaek-woodoku/woodoku:${env.BUILD_NUMBER}"
            docker push "${CURRENT_REGISTRY_HOST}/astute-curve-461807-v0/jibaek-woodoku/woodoku:latest"
            """
        }
    }
  }
}

