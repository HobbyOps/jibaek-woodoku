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
    // declare branchTag variable
    def branchTag = ''

    if (env.BRANCH_NAME == 'master') {
        branchTag = 'prod'
    } else if (env.BRANCH_NAME == 'develop') {
        branchTag = 'dev'
    } else {
        // master나 develop이 아닌 다른 브랜치인 경우 처리
        // 예: 브랜치 이름을 그대로 사용하거나, 'feature' 등으로 설정
        branchTag = env.BRANCH_NAME.replaceAll('[^a-zA-Z0-9-]', '-').toLowerCase()
        echo "경고: master 또는 develop 브랜치가 아닙니다. 태그에 브랜치 이름 '${branchTag}'을 사용합니다."
    }
    // generate dateTag and randomHash
    def dateTag = new Date().format( 'yyyyMMdd' )
    def randomHash = UUID.randomUUID().toString()
    def shortHash = randomHash.replaceAll('-', '').substring(0, 10)
    // set IMAGE_TAG environment variable
    env.IMAGE_TAG = "${branchTag}-${dateTag}-${shortHash}"
    
    withCredentials([file(credentialsId: 'gcp-artifact-registry-jibaek-woodoku', variable: 'GCP_SA_KEY_FILE')]) {
        container('dind') {
            sh """
            cat "${GCP_SA_KEY_FILE}" | docker login -u _json_key --password-stdin asia-northeast3-docker.pkg.dev

            docker tag jenkins-docker-pipeline/woodoku "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:${env.IMAGE_TAG}"
            docker push "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:${env.IMAGE_TAG}"

            # 'latest' 태그는 master 브랜치에서만 푸시하도록 조건부 처리 (권장)
            if [ "${env.BRANCH_NAME}" == "master" ]; then
                echo "Master 브랜치이므로 :latest 태그를 푸시합니다."
                docker tag jenkins-docker-pipeline/woodoku "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:latest"
                docker push "asia-northeast3-docker.pkg.dev/astute-curve-461807-v0/jibaek-woodoku/woodoku:latest"
            else
                echo "Master 브랜치가 아니므로 :latest 태그를 푸시하지 않습니다."
            fi
            """
        }
    }
  }
}

