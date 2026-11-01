pipeline {
    agent any
    
    stages{
        //stage ('Pull To DO Repo'){
        //    steps{
        //        git branch: 'main',
        //            url: 'https://github.com/eslamkhaled201/To-Do-NodeJs-Docker-App.git'
        //        sh 'ls -la'
        //    }
        //}
        
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
