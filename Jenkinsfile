pipeline {
    agent {
        kubernetes {
            label 'dind' // Dind 에이전트 Pod 템플릿의 라벨
        }
    }

    // 환경 변수 설정 (필요에 따라)
    // env {
    //     GAR_LOCATION = 'asia-northeast3'
    //     PROJECT_ID = 'astute-curve-461807-v0' // GCP 프로젝트 ID
    //     REPOSITORY_NAME = 'jibaek-woodoku' // Artifact Registry 저장소 이름
    // }

    stages {
        stage('========== Clone repository ==========') {
            steps {
                checkout scm
            }
        }

        stage('========== Build image ==========') {
            steps {
                script {
                    container('dind') { // DinD 사이드카 컨테이너 안에서 실행
                        sh "docker build -t jenkins-docker-pipeline/woodoku ."
                    }
                }
            }
        }

        stage('========== Push image ==========') {
            steps {
                script {
                    container('dind') { // DinD 사이드카 컨테이너 안에서 실행
                        // Artifact Registry 인증:
                        // Jenkins Agent Pod의 Service Account에 Artifact Registry push 권한이 있다면,
                        // 이 방식은 GKE 환경에서 작동할 것입니다.
                        // (단, 'gcloud' CLI가 'dind' 컨테이너에 없으면, 'jnlp' 컨테이너에 설치하거나
                        // Credentials를 통한 Docker Login 방식 고려)
                        sh """
                        gcloud auth configure-docker asia-northeast3-docker.pkg.dev
                        docker push jenkins-docker-pipeline/woodoku:${env.BUILD_NUMBER}
                        docker push jenkins-docker-pipeline/woodoku:latest
                        """
                    }
                }
            }
        }
    }
}