node {
  stage('========== Clone repository ==========') {
    checkout scm
  }
  stage('========== Build image ==========') {
    app = docker.build("jenkins-docker-pipeline/woodoku")
  }
  stage('========== Push image ==========') {
    docker.withRegistry('asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku', 'gcp-artifact-registry-jibaek-woodoku') {
      app.push("${env.BUILD_NUMBER}")
      app.push("latest")
    }
  }
}