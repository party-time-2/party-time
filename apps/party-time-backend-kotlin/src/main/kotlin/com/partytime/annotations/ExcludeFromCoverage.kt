package com.partytime.annotations

/**
 * Excludes the annotated class or function from the coverage report.
 */
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION)
annotation class ExcludeFromCoverage
