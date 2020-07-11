node(){
    stage('Cloning Git') {
        checkout scm
    }
        
    stage('Install dependencies') {
        nodejs('jenkins-nodejs') {
            sh 'npm install'
            echo "Modules installed"
        }
        
    }
    stage('Build') {
        nodejs('jenkins-nodejs') {
            sh 'npm run build'
            echo "Build completed"
        }
        
    }

    stage('Package Build') {
        sh "tar -zcvf bundle.tar.gz dist/shopping-site"
    }

    stage('Artifacts Creation') {
        fingerprint 'bundle.tar.gz'
        archiveArtifacts 'bundle.tar.gz'
        echo "Artifacts created"
    }

    stage('Stash changes') {
        stash allowEmpty: true, includes: 'bundle.tar.gz', name: 'buildArtifacts'
    }
}

node('angular') {
    echo 'Unstash'
    unstash 'buildArtifacts'
    echo 'Artifacts copied'

    echo 'Copy'
    sh "yes | sudo cp -R bundle.tar.gz /var/www/shopping_app && cd /var/www/shopping_app && sudo tar -xvf bundle.tar.gz"
    echo 'Copy completed'
}
