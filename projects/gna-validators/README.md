# gna-validators
shared library project for the common validators used in GNA

# usage
## preparation
common way to do remote
```
git remote add gna-validators genietom:/genietom/gna-validators
git fetch gna-validators
```

Although this is option, the above sample assuming your `~/.ssh/config` have an entry to make sure you using the right IdentityFile for the github, in case you have multiple github key
```
Host genietom
    HostName github.com
    PreferredAuthentications publickey
    User git
    IdentityFile ~/.ssh/genie_rsa
```

Alternatively you could just add remote with default github identity
```
git remote add gna-validators git://github.com/genietom/gna-validators
```

## subtract from source library project again
```
git branch split-gna-validators
git subtree split --prefix=projects/gna-validators --annotate="(split)" -b split-gna-validators
git push gna-validators split-gna-validators
```
and you could do merge to master in gna-validators repo after review
`git checkout master; git merge split-gna-validators`

## add to your app project
Now you could cd to your target repo (such as app project or formlab project) 
```
rm -r projects/gna-validators
git subtree add --prefix=projects/gna-validators --squash gna-validators master
``` 

## update pull
assuming you are working in branch txxx-patch
```
git checkout txxx-patch
git subtree pull --prefix=projects/gna-validators --squash \
	gna-validators txxx-patch
```
then do PR for txxx-patch in gna-validators

## formlab push
for developing in formlab and push changes to the subtree repo
in your formlab project
```
git subtree push --prefix=projects/gna-validators --squash \
		gna-validators master
```

## review git tree
```
git log --oneline --graph --decorate
```
and using shell tree command 
```
brew install tree
tree projects
```