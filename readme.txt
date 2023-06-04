// Run this commands before start skaffold:

kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf

kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51JQvozFEYn1rBXbtgr4W10ZInngyCVobHMhUPQc2ekXvPmSCtcxOE4JQApna3cmSl5s4oa5IPtr9d8B6noXUs03W00aM6Wjy5Z

// Install ingress-inginx

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml
