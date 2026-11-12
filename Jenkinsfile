pipeline {
    agent {label 'build-agent'}
    
    stages{
        //stage ('Pull To DO Repo'){
        //    steps{
        //        git branch: 'main',
        //            url: 'https://github.com/eslamkhaled201/To-Do-NodeJs-Docker-App.git'
        //        sh 'ls -la'
        //    }
        //}
        stage ('Backend'){
            steps{
                sh 'echo backend install depandencies'
                sh 'cd api/'
                sh 'npm ci'
            }
            steps{
                sh 'echo backend run tests'
                sh 'cd api/'
                sh 'npm run test'
            }
        }
        stage ('Test GitHub trigger'){
            steps{
                sh 'echo triggered change'
            }
        }
        stage ('Run To DO Compose App'){
            steps{
                sh 'docker compose up -d'
            }
            
            post{
                success{
                    sh 'echo To Do App is running'
                    
                }
            }
        }
    }
}
