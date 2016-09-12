module.exports = {
  "env": {
    "node": false,
    "es6": true,
    "browser": true
    },

  "parserOptions": {
    "ecmaVersion": 6
    },

  "globals": {
    "d3": true,
    "nodes": true,
    "links": true
  },

  "rules": {
/**
 * Strict mode
 */
    "strict": 2,                     // http://eslint.org/docs/rules/strict

/**
 * Variables
 */
    // enforce or disallow variable initializations at definition
    "init-declarations": 0,

    // disallow the catch clause parameter name being the same as a variable in the outer scope
    "no-catch-shadow": 0,

    // disallow deletion of variables
    "no-delete-var": 2,

    // disallow labels that share a name with a variable
    "no-label-var": 0,

    // disallow specific globals
    "no-restricted-globals": 0,

    // disallow declaration of variables already declared in the outer scope
    "no-shadow": 2,

    // disallow shadowing of names such as arguments
    "no-shadow-restricted-names": 2,

    // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef": 2,

    // disallow use of undefined when initializing variables
    "no-undef-init": 0,

    // disallow use of undefined variable
    "no-undefined": 0,

    // disallow declaration of variables that are not used in the code
    "no-unused-vars": [2, { "vars": "local", "args": "none" }],

    // disallow use of variables before they are defined
    "no-use-before-define": 2,

/**
 * es6
 */
    // enforces no braces where they can be omitted
    // http://eslint.org/docs/rules/arrow-body-style
    "arrow-body-style": [2, "as-needed"],

    // require parens in arrow function arguments
    "arrow-parens": 0,

    // require space before/after arrow function"s arrow
    // http://eslint.org/docs/rules/arrow-spacing
    "arrow-spacing": [2, { "before": true, "after": true }],

    // verify super() callings in constructors
    "constructor-super": 0,

    // enforce the spacing around the * in generator functions
    // http://eslint.org/docs/rules/generator-star-spacing
    "generator-star-spacing": [2, { "before": false, "after": true }],

    // disallow modifying variables of class declarations
    // http://eslint.org/docs/rules/no-class-assign
    "no-class-assign": 2,

    // disallow arrow functions where they could be confused with comparisons
    // http://eslint.org/docs/rules/no-confusing-arrow
    "no-confusing-arrow": [2, {
      "allowParens": true,
    }],

    // disallow modifying variables that are declared using const
    "no-const-assign": 2,

    // disallow duplicate class members
    // http://eslint.org/docs/rules/no-dupe-class-members
    "no-dupe-class-members": 2,

    // disallow importing from the same path more than once
    // http://eslint.org/docs/rules/no-duplicate-imports
    "no-duplicate-imports": 2,

    // disallow symbol constructor
    // http://eslint.org/docs/rules/no-new-symbol
    "no-new-symbol": 2,

    // disallow specific imports
    // http://eslint.org/docs/rules/no-restricted-imports
    "no-restricted-imports": 0,

    // disallow to use this/super before super() calling in constructors.
    "no-this-before-super": 0,

    // disallow useless computed property keys
    // http://eslint.org/docs/rules/no-useless-computed-key
    "no-useless-computed-key": 2,

    // disallow unnecessary constructor
    // http://eslint.org/docs/rules/no-useless-constructor
    "no-useless-constructor": 2,

    // disallow renaming import, export, and destructured assignments to the same name
    // http://eslint.org/docs/rules/no-useless-rename
    "no-useless-rename": [2, {
      "ignoreDestructuring": false,
      "ignoreImport": false,
      "ignoreExport": false,
    }],

    // require let or const instead of var
    "no-var": 2,

    // require method and property shorthand syntax for object literals
    // http://eslint.org/docs/rules/object-shorthand
    "object-shorthand": [2, "always", {
      "ignoreConstructors": false,
      "avoidQuotes": true,
    }],

    // suggest using arrow functions as callbacks
    "prefer-arrow-callback": [2, {
      "allowNamedFunctions": true,
      "allowUnboundThis": true,
    }],

    // suggest using of const declaration for variables that are never modified after declared
    "prefer-const": [2, {
      "destructuring": "any",
      "ignoreReadBeforeAssign": true,
    }],

    // suggest using Reflect methods where applicable
    "prefer-reflect": 0,

    // use rest parameters instead of arguments
    // http://eslint.org/docs/rules/prefer-rest-params
    "prefer-rest-params": 0,

    // suggest using the spread operator instead of .apply()
    "prefer-spread": 0,

    // suggest using template literals instead of string concatenation
    // http://eslint.org/docs/rules/prefer-template
    "prefer-template": 2,

    // disallow generator functions that do not have yield
    "require-yield": 0,

    // enforce spacing between object rest-spread
    // http://eslint.org/docs/rules/rest-spread-spacing
    "rest-spread-spacing": [2, "never"],

    // import sorting
    // http://eslint.org/docs/rules/sort-imports
    "sort-imports": 0,

    // enforce usage of spacing in template strings
    // http://eslint.org/docs/rules/template-curly-spacing
    "template-curly-spacing": 2,

    // enforce spacing around the * in yield* expressions
    // http://eslint.org/docs/rules/yield-star-spacing
    "yield-star-spacing": [2, "after"],

/**
 * Possible errors
 */
    "comma-dangle": [2, "never"],    // http://eslint.org/docs/rules/comma-dangle
    "no-cond-assign": [2, "always"], // http://eslint.org/docs/rules/no-cond-assign
    "no-console": 1,                 // http://eslint.org/docs/rules/no-console
    "no-constant-condition": 1,      // http://eslint.org/docs/rules/no-constant-condition
    "no-dupe-args": 2,
    "no-dupe-keys": 2,               // http://eslint.org/docs/rules/no-dupe-keys
    "no-duplicate-case": 2,          // http://eslint.org/docs/rules/no-duplicate-case
    "no-empty": 2,                   // http://eslint.org/docs/rules/no-empty
    "no-empty-character-class": 2,   // http://eslint.org/docs/rules/no-empty-character-class
    "no-extra-boolean-cast": 0,
    "no-ex-assign": 2,               // http://eslint.org/docs/rules/no-ex-assign
    "no-extra-parens": [0, "all", {
      "conditionalAssign": true,
      "nestedBinaryExpressions": false,
      "returnAssign": false,
    }],

    "no-extra-semi": 2,              // http://eslint.org/docs/rules/no-extra-semi
    "no-func-assign": 2,             // http://eslint.org/docs/rules/no-func-assign
    "no-inner-declarations": 2,      // http://eslint.org/docs/rules/no-inner-declarations
    "no-invalid-regexp": 2,          // http://eslint.org/docs/rules/no-invalid-regexp
    "no-irregular-whitespace": 2,    // http://eslint.org/docs/rules/no-irregular-whitespace
    "no-negated-in-lhs": 2,          // http://eslint.org/docs/rules/no-negated-in-lhs
    "no-prototype-builtins": 2,
    "no-obj-calls": 2,               // http://eslint.org/docs/rules/no-obj-calls
    "no-regex-spaces": 2,            // http://eslint.org/docs/rules/no-regex-spaces
    "no-sparse-arrays": 2,           // http://eslint.org/docs/rules/no-sparse-arrays
    "no-unsafe-finally": 2,
    "no-unreachable": 2,             // http://eslint.org/docs/rules/no-unreachable
    "use-isnan": 2,                  // http://eslint.org/docs/rules/use-isnan
    "valid-typeof": 2,               // http://eslint.org/docs/rules/valid-typeof

/**
 * Best practices
 */
    // enforces getter/setter pairs in objects
    "accessor-pairs": 0,

    // enforces return statements in callbacks of array"s methods
    // http://eslint.org/docs/rules/array-callback-return
    "array-callback-return": 2,

    // treat var statements as if they were block scoped
    "block-scoped-var": 2,

    // specify the maximum cyclomatic complexity allowed in a program
    "complexity": [0, 11],

    // require return statements to either always or never specify values
    "consistent-return": 0,

    // specify curly brace conventions for all control statements
    "curly": [2, "multi-line"],

    // require default case in switch statements
    "default-case": [2, { "commentPattern": "^no default$" }],

    // encourages use of dot notation whenever possible
    "dot-notation": [2, { "allowKeywords": true }],

    // enforces consistent newlines before or after dots
    "dot-location": 0,

    // require the use of === and !==
    // http://eslint.org/docs/rules/eqeqeq
    "eqeqeq": [2, "allow-null"],

    // make sure for-in loops have an if statement
    "guard-for-in": 2,

    // disallow the use of alert, confirm, and prompt
    "no-alert": 1,

    // disallow use of arguments.caller or arguments.callee
    "no-caller": 2,

    // disallow lexical declarations in case/default clauses
    // http://eslint.org/docs/rules/no-case-declarations.html
    "no-case-declarations": 2,

    // disallow division operators explicitly at beginning of regular expression
    "no-div-regex": 0,

    // disallow else after a return in an if
    "no-else-return": 2,

    // disallow empty functions, except for standalone funcs/arrows
    // http://eslint.org/docs/rules/no-empty-function
    "no-empty-function": [2, {
      "allow": [
        "arrowFunctions",
        "functions",
        "methods",
      ]
    }],

    // disallow empty destructuring patterns
    // http://eslint.org/docs/rules/no-empty-pattern
    "no-empty-pattern": 2,

    // disallow comparisons to null without a type-checking operator
    "no-eq-null": 0,

    // disallow use of eval()
    "no-eval": 2,

    // disallow adding to native types
    "no-extend-native": 2,

    // disallow unnecessary function binding
    "no-extra-bind": 2,

    // disallow Unnecessary Labels
    // http://eslint.org/docs/rules/no-extra-label
    "no-extra-label": 2,

    // disallow fallthrough of case statements
    "no-fallthrough": 2,

    // disallow the use of leading or trailing decimal points in numeric literals
    "no-floating-decimal": 2,

    // disallow the type conversions with shorter notations
    "no-implicit-coercion": 0,

    // disallow var and named functions in global scope
    // http://eslint.org/docs/rules/no-implicit-globals
    "no-implicit-globals": 0,

    // disallow use of eval()-like methods
    "no-implied-eval": 2,

    // disallow this keywords outside of classes or class-like objects
    "no-invalid-this": 0,

    // disallow usage of __iterator__ property
    "no-iterator": 2,

    // disallow use of labels for anything other then loops and switches
    "no-labels": [2, { "allowLoop": false, "allowSwitch": false }],

    // disallow unnecessary nested blocks
    "no-lone-blocks": 2,

    // disallow creation of functions within loops
    "no-loop-func": 2,

    // disallow magic numbers
    // http://eslint.org/docs/rules/no-magic-numbers
    "no-magic-numbers": [0, {
      "ignore": [],
      "ignoreArrayIndexes": true,
      "enforceConst": true,
      "detectObjects": false,
    }],

    // disallow use of multiple spaces
    "no-multi-spaces": 2,

    // disallow use of multiline strings
    "no-multi-str": 2,

    // disallow reassignments of native objects
    "no-native-reassign": 2,

    // disallow use of new operator when not part of the assignment or comparison
    "no-new": 2,

    // disallow use of new operator for Function object
    "no-new-func": 2,

    // disallows creating new instances of String, Number, and Boolean
    "no-new-wrappers": 2,

    // disallow use of (old style) octal literals
    "no-octal": 2,

    // disallow use of octal escape sequences in string literals, such as
    // var foo = "Copyright \251";
    "no-octal-escape": 2,

    // disallow reassignment of function parameters
    // disallow parameter object manipulation
    // rule: http://eslint.org/docs/rules/no-param-reassign.html
    "no-param-reassign": [2, { "props": false }],

    // disallow usage of __proto__ property
    "no-proto": 2,

    // disallow declaring the same variable more then once
    "no-redeclare": 2,

    // disallow use of assignment in return statement
    "no-return-assign": 2,

    // disallow use of `javascript:` urls.
    "no-script-url": 2,

    // disallow self assignment
    // http://eslint.org/docs/rules/no-self-assign
    "no-self-assign": 2,

    // disallow comparisons where both sides are exactly the same
    "no-self-compare": 2,

    // disallow use of comma operator
    "no-sequences": 2,

    // restrict what can be thrown as an exception
    "no-throw-literal": 2,

    // disallow unmodified conditions of loops
    // http://eslint.org/docs/rules/no-unmodified-loop-condition
    "no-unmodified-loop-condition": 0,

    // disallow usage of expressions in statement position
    "no-unused-expressions": 2,

    // disallow unused labels
    // http://eslint.org/docs/rules/no-unused-labels
    "no-unused-labels": 2,

    // disallow unnecessary .call() and .apply()
    "no-useless-call": 0,

    // disallow useless string concatenation
    // http://eslint.org/docs/rules/no-useless-concat
    "no-useless-concat": 2,

    // disallow unnecessary string escaping
    // http://eslint.org/docs/rules/no-useless-escape
    "no-useless-escape": 2,

    // disallow use of void operator
    "no-void": 0,

    // disallow usage of configurable warning terms in comments: e.g. todo
    "no-warning-comments": [0, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],

    // disallow use of the with statement
    "no-with": 2,

    // require use of the second argument for parseInt()
    "radix": 2,

    // requires to declare all vars on top of their containing scope
    "vars-on-top": 2,

    // require immediate function invocation to be wrapped in parentheses
    // http://eslint.org/docs/rules/wrap-iife.html
    "wrap-iife": [2, "outside"],

    // require or disallow Yoda conditions
    "yoda": 2,

/**
 * Style
 */
        // enforce spacing inside array brackets
    "array-bracket-spacing": [2, "never"],

    // enforce spacing inside single-line blocks
    // http://eslint.org/docs/rules/block-spacing
    "block-spacing": [2, "always"],

    // enforce one true brace style
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],

    // require camel case names
    "camelcase": [2, { "properties": "never" }],

    // enforce spacing before and after comma
    "comma-spacing": [2, { "before": false, "after": true }],

    // enforce one true comma style
    "comma-style": [2, "last"],

    // disallow padding inside computed properties
    "computed-property-spacing": [2, "never"],

    // enforces consistent naming when capturing the current execution context
    "consistent-this": 0,

    // enforce newline at the end of file, with no multiple empty lines
    "eol-last": 2,

    // require function expressions to have a name
    "func-names": 1,

    // enforces use of function declarations or expressions
    "func-style": 0,

    // Blacklist certain identifiers to prevent them being used
    // http://eslint.org/docs/rules/id-blacklist
    "id-blacklist": 0,

    // this option enforces minimum and maximum identifier lengths
    // (variable names, property names etc.)
    "id-length": 0,

    // require identifiers to match the provided regular expression
    "id-match": 0,

    // this option sets a specific tab width for your code
    // http://eslint.org/docs/rules/indent
    "indent": [2, 2, { "SwitchCase": 1, "VariableDeclarator": 1 }],

    // specify whether double or single quotes should be used in JSX attributes
    // http://eslint.org/docs/rules/jsx-quotes
    "jsx-quotes": 0,

    // enforces spacing between keys and values in object literal properties
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],

    // require a space before & after certain keywords
    "keyword-spacing": [2, {
      "before": true,
      "after": true,
      "overrides": {
        "return": { "after": true },
        "throw": { "after": true },
        "case": { "after": true }
      }
    }],

    // disallow mixed "LF" and "CRLF" as linebreaks
    "linebreak-style": 0,

    // enforces empty lines around comments
    "lines-around-comment": 0,

    // specify the maximum depth that blocks can be nested
    "max-depth": [0, 4],

    // specify the maximum length of a line in your program
    // http://eslint.org/docs/rules/max-len
    "max-len": [2, 100, 2, {
      "ignoreUrls": true,
      "ignoreComments": false
    }],

    // specify the max number of lines in a file
    // http://eslint.org/docs/rules/max-lines
    "max-lines": [0, {
      "max": 300,
      "skipBlankLines": true,
      "skipComments": true
    }],

    // specify the maximum depth callbacks can be nested
    "max-nested-callbacks": 0,

    // limits the number of parameters that can be used in the function declaration.
    "max-params": [0, 3],

    // specify the maximum number of statement allowed in a function
    "max-statements": [0, 10],

    // restrict the number of statements per line
    // http://eslint.org/docs/rules/max-statements-per-line
    "max-statements-per-line": [0, { "max": 1 }],

    // require a capital letter for constructors
    "new-cap": [2, { "newIsCap": true }],

    // disallow the omission of parentheses when invoking a constructor with no arguments
    "new-parens": 0,

    // allow/disallow an empty newline after var statement
    "newline-after-var": 0,

    // http://eslint.org/docs/rules/newline-before-return
    "newline-before-return": 0,

    // enforces new line after each method call in the chain to make it
    // more readable and easy to maintain
    // http://eslint.org/docs/rules/newline-per-chained-call
    "newline-per-chained-call": [2, { "ignoreChainWithDepth": 3 }],

    // disallow use of the Array constructor
    "no-array-constructor": 2,

    // disallow use of bitwise operators
    "no-bitwise": 0,

    // disallow use of the continue statement
    "no-continue": 0,

    // disallow comments inline after code
    "no-inline-comments": 0,

    // disallow if as the only statement in an else block
    "no-lonely-if": 0,

    // disallow un-paren"d mixes of different operators
    // http://eslint.org/docs/rules/no-mixed-operators
    "no-mixed-operators": [2, {
      "groups": [
        ["+", "-", "*", "/", "%", "**"],
        ["&", "|", "^", "~", "<<", ">>", ">>>"],
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ],
      "allowSamePrecedence": false
    }],

    // disallow mixed spaces and tabs for indentation
    "no-mixed-spaces-and-tabs": 2,

    // disallow multiple empty lines and only one newline at the end
    "no-multiple-empty-lines": [2, { "max": 2, "maxEOF": 1 }],

    // disallow negated conditions
    // http://eslint.org/docs/rules/no-negated-condition
    "no-negated-condition": 0,

    // disallow nested ternary expressions
    "no-nested-ternary": 2,

    // disallow use of the Object constructor
    "no-new-object": 2,

    // disallow use of unary operators, ++ and --
    "no-plusplus": 0,

    // disallow certain syntax forms
    // http://eslint.org/docs/rules/no-restricted-syntax
    "no-restricted-syntax": [
      2,
      "DebuggerStatement",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],

    // disallow space between function identifier and application
    "no-spaced-func": 2,

    // disallow the use of ternary operators
    "no-ternary": 0,

    // disallow trailing whitespace at the end of lines
    "no-trailing-spaces": 2,

    // disallow dangling underscores in identifiers
    "no-underscore-dangle": [0, { "allowAfterThis": false }],

    // disallow the use of Boolean literals in conditional expressions
    // also, prefer `a || b` over `a ? a : b`
    // http://eslint.org/docs/rules/no-unneeded-ternary
    "no-unneeded-ternary": [2, { "defaultAssignment": false }],

    // disallow whitespace before properties
    // http://eslint.org/docs/rules/no-whitespace-before-property
    "no-whitespace-before-property": 2,

    // require padding inside curly braces
    "object-curly-spacing": [2, "always"],

    // enforce line breaks between braces
    // http://eslint.org/docs/rules/object-curly-newline
    // TODO: enable once https://github.com/eslint/eslint/issues/6488 is resolved
    "object-curly-newline": [0, {
      "ObjectExpression": { "minProperties": 0, "multiline": true },
      "ObjectPattern": { "minProperties": 0, "multiline": true }
    }],

    // enforce "same line" or "multiple line" on object properties.
    // http://eslint.org/docs/rules/object-property-newline
    "object-property-newline": [0, {
      "allowMultiplePropertiesPerLine": true,
    }],

    // allow just one var statement per function
    "one-var": [2, "never"],

    // require a newline around variable declaration
    // http://eslint.org/docs/rules/one-var-declaration-per-line
    "one-var-declaration-per-line": [2, "always"],

    // require assignment operator shorthand where possible or prohibit it entirely
    "operator-assignment": 0,

    // enforce operators to be placed before or after line breaks
    "operator-linebreak": 0,

    // enforce padding within blocks
    "padded-blocks": [2, "never"],

    // require quotes around object literal property names
    // http://eslint.org/docs/rules/quote-props.html
    "quote-props": [2, "as-needed", { "keywords": false, "unnecessary": true, "numbers": false }],

    // specify whether double or single quotes should be used
    "quotes": [2, "single", { "avoidEscape": true }],

    // do not require jsdoc
    // http://eslint.org/docs/rules/require-jsdoc
    "require-jsdoc": 0,

    // require or disallow use of semicolons instead of ASI
    "semi": [2, "always"],

    // enforce spacing before and after semicolons
    "semi-spacing": [2, { "before": false, "after": true }],

    // sort variables within the same declaration block
    "sort-vars": 0,

    // require or disallow space before blocks
    "space-before-blocks": 2,

    // require or disallow space before function opening parenthesis
    // http://eslint.org/docs/rules/space-before-function-paren
    "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }],

    // require or disallow spaces inside parentheses
    "space-in-parens": [2, "never"],

    // require spaces around operators
    "space-infix-ops": 2,

    // Require or disallow spaces before/after unary operators
    "space-unary-ops": 0,

    // require or disallow a space immediately following the // or /* in a comment
    "spaced-comment": [2, "always", {
      "exceptions": ["-", "+"],
      "markers": ["=", "!"]           // space here to support sprockets directives
    }],

    // require or disallow the Unicode Byte Order Mark
    // http://eslint.org/docs/rules/unicode-bom
    "unicode-bom": [2, "never"],

    // require regex literals to be wrapped in parentheses
    "wrap-regex": 0,

/**
 * Node
 */
     // enforce return after a callback
    "callback-return": 0,

    // require all requires be top-level
    // http://eslint.org/docs/rules/global-require
    "global-require": 2,

    // enforces error handling in callbacks (node environment)
    "handle-callback-err": 0,

    // disallow mixing regular variable and require declarations
    "no-mixed-requires": [0, false],

    // disallow use of new operator with the require function
    "no-new-require": 2,

    // disallow string concatenation with __dirname and __filename
    "no-path-concat": 0,

    // disallow use of process.env
    "no-process-env": 0,

    // disallow process.exit()
    "no-process-exit": 0,

    // restrict usage of specified node modules
    "no-restricted-modules": 0,

    // disallow use of synchronous methods (off by default)
    "no-sync": 0
  }
}
